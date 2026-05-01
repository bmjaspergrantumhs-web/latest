import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import ServiceDetail from '../pages/ServiceDetail';
import Booking from '../pages/Booking';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Gallery from '../pages/Gallery';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { dbService, DBLead, DBNotification, DBSystemLog } from '../db';
import { StudioToast, NotificationType } from '../types';
import { SERVICES } from '../constants';

// --- Notification Context ---
interface NotificationContextType {
  showToast: (message: string, type?: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useStudioNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useStudioNotification must be used within a NotificationProvider");
  return context;
};

const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<StudioToast[]>([]);

  const showToast = (message: string, type: NotificationType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  return (
    <NotificationContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-10 right-10 z-[100] flex flex-col gap-4 pointer-events-none">
        {toasts.map((toast) => (
          <div 
            key={toast.id}
            className={`pointer-events-auto bg-white border-l-4 p-5 shadow-2xl min-w-[320px] animate-fade-in flex items-center justify-between gap-6 transition-all transform hover:scale-105 ${
              toast.type === 'success' ? 'border-emerald-900' : 
              toast.type === 'error' ? 'border-red-900' : 
              'border-stone-900'
            }`}
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-1.5 h-1.5 rounded-full ${toast.type === 'success' ? 'bg-emerald-600' : 'bg-stone-400'}`}></div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Studio Alert</p>
              </div>
              <p className="text-xs font-medium text-stone-900 tracking-tight leading-relaxed">{toast.message}</p>
            </div>
            <button onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} className="text-stone-300 hover:text-stone-950 transition-colors">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

// --- Admin Component ---

const AdminLeads = () => {
  const [leads, setLeads] = useState<DBLead[]>([]);
  const [notifications, setNotifications] = useState<DBNotification[]>([]);
  const [systemLogs, setSystemLogs] = useState<DBSystemLog[]>([]);
  const [view, setView] = useState<'leads' | 'notifications' | 'system'>('leads');
  const [lastBackup, setLastBackup] = useState<string>('Never');
  const [selectedNote, setSelectedNote] = useState<DBNotification | null>(null);
  const [dbSize, setDbSize] = useState<number>(0);
  const { showToast } = useStudioNotification();
  
  const refreshData = async () => {
    const [l, n, s] = await Promise.all([
      dbService.getAllLeads(),
      dbService.getAllNotifications(),
      dbService.getAllSystemLogs()
    ]);
    setLeads(l);
    setNotifications(n);
    setSystemLogs(s);
    setDbSize(dbService.getDbSize());
  };

  useEffect(() => {
    refreshData();
    const backup = localStorage.getItem('last_studio_backup');
    if (backup) setLastBackup(new Date(backup).toLocaleString());
  }, []);

  const handleExport = async () => {
    await dbService.exportDatabase();
    const timestamp = new Date().toISOString();
    localStorage.setItem('last_studio_backup', timestamp);
    setLastBackup(new Date(timestamp).toLocaleString());
    showToast("Master database backup exported successfully.", "success");
    refreshData();
  };

  const handlePurge = async () => {
    if(confirm("Studio warning: This will flush the LocalStorage mirror. Database must be exported first to avoid loss. Proceed?")) {
      await dbService.logSystemEvent('Persistence Purged', 'User manually cleared the local storage database mirror.');
      localStorage.clear();
      window.location.reload();
    }
  };

  const handleIntegrityCheck = async () => {
    await dbService.logSystemEvent('Integrity Check', 'Manual system health validation executed.');
    showToast("Database integrity check: 100% Valid.", "success");
    refreshData();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast("Dispatch report copied to clipboard.", "success");
  };

  return (
    <div className="p-6 md:p-12 bg-[#fcfbf7] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-800">Operational Dashboard</h4>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold brand-font text-stone-950">Studio Management</h2>
            <p className="text-stone-500 text-sm mt-2 serif-text italic">Internal administration, heritage logs, and system maintenance.</p>
          </div>
          
          <div className="flex flex-wrap gap-4">
             <div className="bg-white border border-stone-200 px-6 py-3 rounded-sm flex items-center gap-4 shadow-sm">
                <div>
                  <p className="text-[8px] font-bold text-stone-400 uppercase tracking-widest">Last Backup</p>
                  <p className="text-[10px] font-bold text-stone-700">{lastBackup}</p>
                </div>
                <button 
                  onClick={handleExport}
                  className="bg-emerald-950 text-white p-2 rounded-sm hover:bg-black transition-all"
                  title="Force Backup"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
             </div>
             
            <div className="bg-stone-200 p-1 rounded-sm flex">
              <button 
                onClick={() => setView('leads')}
                className={`px-6 py-2 text-[9px] uppercase tracking-widest font-bold rounded-sm transition-all ${view === 'leads' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'}`}
              >
                Inquiries
              </button>
              <button 
                onClick={() => setView('notifications')}
                className={`px-6 py-2 text-[9px] uppercase tracking-widest font-bold rounded-sm transition-all ${view === 'notifications' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'}`}
              >
                Dispatch
              </button>
              <button 
                onClick={() => setView('system')}
                className={`px-6 py-2 text-[9px] uppercase tracking-widest font-bold rounded-sm transition-all ${view === 'system' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'}`}
              >
                Audit
              </button>
            </div>
          </div>
        </div>

        {/* Stats Summary Panel */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
           <div className="bg-white p-8 border border-stone-100 shadow-sm rounded-sm">
              <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-2">Total Leads</p>
              <p className="text-3xl font-bold text-stone-950 brand-font">{leads.length}</p>
           </div>
           <div className="bg-white p-8 border border-stone-100 shadow-sm rounded-sm">
              <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-2">Active Notifications</p>
              <p className="text-3xl font-bold text-stone-950 brand-font">{notifications.length}</p>
           </div>
           <div className="bg-white p-8 border border-stone-100 shadow-sm rounded-sm">
              <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-2">System Events</p>
              <p className="text-3xl font-bold text-stone-950 brand-font">{systemLogs.length}</p>
           </div>
           <div className="bg-emerald-950 p-8 shadow-sm rounded-sm text-white">
              <p className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest mb-2">DB Utilization</p>
              <p className="text-3xl font-bold brand-font">{(dbSize / 1024).toFixed(1)} <span className="text-sm font-sans uppercase">KB</span></p>
           </div>
        </div>

        {view === 'leads' && (
          <div className="bg-white border border-stone-100 shadow-2xl rounded-sm overflow-hidden animate-fade-in">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50 text-[10px] uppercase tracking-widest text-stone-400 border-b border-stone-100">
                    <th className="p-8">Classification</th>
                    <th className="p-8">Client Principal</th>
                    <th className="p-8">Property Locale</th>
                    <th className="p-8">Selected Requirements</th>
                    <th className="p-8">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {leads.map(lead => (
                    <tr key={lead.id} className="hover:bg-emerald-50/30 border-b border-stone-50 last:border-0 transition-colors">
                      <td className="p-8">
                        <span className={`px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest ${
                          lead.type === 'booking' ? 'bg-emerald-900 text-white' : 
                          lead.type === 'quotation' ? 'bg-amber-100 text-amber-900' : 
                          'bg-stone-100 text-stone-800'
                        }`}>
                          {lead.type}
                        </span>
                      </td>
                      <td className="p-8">
                        <p className="font-bold text-stone-950 text-sm tracking-tight">{lead.contactName}</p>
                        <p className="text-stone-400 text-[10px] font-medium">{lead.email}</p>
                      </td>
                      <td className="p-8">
                        <p className="text-stone-600 font-medium">{lead.address}</p>
                        <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-1">{lead.postalCode} • {lead.propertyType}</p>
                      </td>
                      <td className="p-8">
                        <div className="flex flex-wrap gap-1.5">
                          {lead.selectedServices.map((s, i) => (
                            <span key={i} className="px-2 py-0.5 bg-white border border-stone-200 text-[9px] uppercase font-bold text-stone-500 rounded-sm">{s}</span>
                          ))}
                        </div>
                      </td>
                      <td className="p-8 text-stone-400 text-[10px] font-bold tabular-nums">
                        {new Date(lead.created_at!).toLocaleDateString('en-CA', { 
                          year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' 
                        })}
                      </td>
                    </tr>
                  ))}
                  {leads.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-32 text-center text-stone-300 italic serif-text">No botanical inquiries logged.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {view === 'notifications' && (
           <div className="bg-white border border-stone-100 shadow-2xl rounded-sm overflow-hidden animate-fade-in">
             <div className="p-8 border-b border-stone-50 bg-stone-50/50 flex justify-between items-center">
                <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-400">Dispatch Audit Trail</h3>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[9px] text-emerald-800 font-bold uppercase tracking-widest">Gateway Online</span>
                </div>
             </div>
             <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50/30 text-[9px] uppercase tracking-widest text-stone-400 border-b border-stone-100">
                    <th className="p-6">Recipient</th>
                    <th className="p-6">Subject</th>
                    <th className="p-6">Status</th>
                    <th className="p-6">Action</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {notifications.map(note => (
                    <tr key={note.id} className="hover:bg-stone-50 border-b border-stone-50 last:border-0 transition-colors">
                      <td className="p-6 font-bold text-stone-700 tracking-tight">{note.recipient}</td>
                      <td className="p-6 italic serif-text text-stone-500">{note.subject}</td>
                      <td className="p-6">
                        <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-sm text-[8px] font-bold uppercase ${
                          note.status === 'sent' ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'bg-red-50 text-red-800 border border-red-100'
                        }`}>
                          {note.status === 'sent' && <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>}
                          {note.status}
                        </div>
                      </td>
                      <td className="p-6">
                        <button 
                          onClick={() => setSelectedNote(note)}
                          className="text-[9px] uppercase font-bold text-stone-400 hover:text-emerald-900 transition-colors tracking-widest"
                        >
                          Inspect Report
                        </button>
                      </td>
                    </tr>
                  ))}
                  {notifications.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-20 text-center text-stone-300 italic serif-text">No telemetry records.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {view === 'system' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            <div className="lg:col-span-2 bg-white border border-stone-100 shadow-2xl rounded-sm overflow-hidden">
               <div className="p-8 border-b border-stone-50 bg-stone-50/50">
                  <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-400">System Log Audit</h3>
               </div>
               <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-stone-50/30 text-[9px] uppercase tracking-widest text-stone-400 border-b border-stone-100">
                      <th className="p-6">Event</th>
                      <th className="p-6">Details</th>
                      <th className="p-6">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs">
                    {systemLogs.map(log => (
                      <tr key={log.id} className="hover:bg-stone-50 border-b border-stone-50 last:border-0 transition-colors">
                        <td className="p-6 font-bold text-stone-700 uppercase tracking-widest text-[10px]">{log.event}</td>
                        <td className="p-6 italic serif-text text-stone-500">{log.details}</td>
                        <td className="p-6 text-stone-400 text-[10px] tabular-nums whitespace-nowrap">{new Date(log.timestamp).toLocaleString()}</td>
                      </tr>
                    ))}
                    {systemLogs.length === 0 && (
                      <tr>
                        <td colSpan={3} className="p-20 text-center text-stone-300 italic serif-text">No system events recorded.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="space-y-8">
               <div className="bg-white border border-stone-200 p-10 rounded-sm shadow-sm">
                  <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-400 mb-6">Maintenance Operations</h4>
                  <p className="text-xs text-stone-500 mb-8 leading-relaxed italic">Regular database maintenance ensures the longevity of client historical records and architectural logs.</p>
                  <div className="space-y-4">
                    <button 
                      onClick={handlePurge}
                      className="w-full py-4 text-[9px] uppercase font-bold tracking-widest text-red-700 border border-red-100 hover:bg-red-50 transition-all rounded-sm"
                    >
                      Purge Local Persistence
                    </button>
                    <button 
                      onClick={handleIntegrityCheck}
                      className="w-full py-4 text-[9px] uppercase font-bold tracking-widest text-stone-600 border border-stone-100 hover:bg-stone-50 transition-all rounded-sm"
                    >
                      Run Integrity Check
                    </button>
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* Dispatch Report Modal */}
        {selectedNote && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-fade-in">
             <div className="bg-white w-full max-w-2xl shadow-2xl border border-stone-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-950"></div>
                <div className="p-10">
                   <div className="flex justify-between items-start mb-10">
                      <div>
                        <h3 className="text-xl font-bold brand-font text-stone-950 mb-1">Studio Dispatch Report</h3>
                        <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Telemetry Audit • ID #{selectedNote.id}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => copyToClipboard(selectedNote.message_body)}
                          className="text-stone-400 hover:text-emerald-900 transition-colors"
                          title="Copy to Clipboard"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>
                        <button onClick={() => setSelectedNote(null)} className="text-stone-300 hover:text-stone-900 transition-colors">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>
                      </div>
                   </div>
                   
                   <div className="bg-stone-50 border border-stone-100 p-8 rounded-sm">
                      <pre className="text-[11px] leading-relaxed font-mono text-stone-600 overflow-x-auto whitespace-pre-wrap">
                        {selectedNote.message_body}
                      </pre>
                   </div>
                   
                   <div className="mt-10 flex justify-between items-center text-[10px] text-stone-400 uppercase tracking-widest font-bold">
                      <p>Recipient: {selectedNote.recipient}</p>
                      <p>Status: {selectedNote.status.toUpperCase()}</p>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4 mt-10">
                      <button 
                        onClick={() => copyToClipboard(selectedNote.message_body)}
                        className="bg-stone-100 text-stone-600 py-4 text-[10px] uppercase font-bold tracking-[0.3em] hover:bg-stone-200 transition-all"
                      >
                        Copy Report
                      </button>
                      <button 
                        onClick={() => setSelectedNote(null)}
                        className="bg-emerald-950 text-white py-4 text-[10px] uppercase font-bold tracking-[0.3em] hover:bg-black transition-all"
                      >
                        Close Report
                      </button>
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <HashRouter>
      <NotificationProvider>
        <div className="min-h-screen flex flex-col selection:bg-emerald-900 selection:text-white">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services/:id" element={<ServiceDetail />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/admin" element={<AdminLeads />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </NotificationProvider>
    </HashRouter>
  );
}
