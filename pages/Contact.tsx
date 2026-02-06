
import React, { useState, useEffect, useRef } from 'react';
import { PAGE_METADATA } from '../constants';
import SEO from '../components/SEO';
import { dbService } from '../db';
import { notificationService } from '../services/notificationService';
import { useStudioNotification } from '../src/App';

const ServiceMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    // @ts-ignore
    const L = window.L;
    if (!L) return;

    const map = L.map(mapContainer.current, {
      center: [43.72, -79.38],
      zoom: 10,
      scrollWheelZoom: false,
      zoomControl: false
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    const serviceAreaCoords = [
      [43.58, -79.64], [43.45, -79.70], [43.70, -79.80], [43.85, -79.50], 
      [43.95, -79.30], [43.85, -79.10], [43.70, -79.20], [43.60, -79.40]
    ];

    L.polygon(serviceAreaCoords, {
      color: '#064e3b',
      fillColor: '#064e3b',
      fillOpacity: 0.1,
      weight: 1,
      dashArray: '5, 10'
    }).addTo(map);

    const studioIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `<div class="w-4 h-4 bg-emerald-950 rounded-full border-2 border-white shadow-xl animate-pulse"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });

    L.marker([43.77, -79.34], { icon: studioIcon })
      .addTo(map)
      .bindPopup(`
        <div class="p-2 font-sans">
          <p class="text-[10px] font-bold uppercase tracking-widest text-emerald-900 mb-1">The Garden Architect</p>
          <p class="text-[9px] text-stone-500">Richmond Hill, Ontario</p>
        </div>
      `);

    mapInstance.current = map;

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="relative group overflow-hidden bg-stone-100 border border-stone-200 aspect-[16/9] shadow-2xl">
      <div ref={mapContainer} className="w-full h-full grayscale-[0.5] hover:grayscale-0 transition-all duration-1000" />
      <div className="absolute top-6 left-6 z-[400] pointer-events-none">
        <div className="bg-[#fcfbf7]/95 backdrop-blur-md p-6 border border-stone-100 shadow-xl max-w-[200px]">
           <div className="flex items-center gap-3 mb-3">
             <div className="w-2 h-2 bg-emerald-900 rounded-full animate-pulse"></div>
             <p className="text-[9px] font-bold text-stone-900 uppercase tracking-[0.3em]">Operational Reach</p>
           </div>
           <p className="text-[8px] text-stone-400 uppercase tracking-widest leading-loose">
             Ontario
           </p>
        </div>
      </div>
    </div>
  );
};

const Contact = () => {
  const { showToast } = useStudioNotification();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'The Garden Architect',
    message: ''
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    showToast("Opening Studio Dispatch...", "info");
    
    try {
      // 1. Log to DB
      await dbService.saveLead({
        contactName: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: 'Contact Form Message',
        postalCode: 'N/A',
        propertyType: 'Residential' as any,
        selectedServices: [formData.subject],
        type: 'contact'
      });

      // 2. Dispatch Notification
      const res = await notificationService.dispatchStudioAlert('contact', formData);
      
      if (res.success) {
        showToast("Correspondence logged successfully.", "success");
        setSent(true);
      }
    } catch (err) {
      console.error(err);
      showToast("Dispatch failed. System telemetry error.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fcfbf7]">
      <SEO metadata={PAGE_METADATA.contact} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          
          <div>
            <span className="text-emerald-900 text-xs font-bold uppercase tracking-[0.5em] block mb-8">Engagement</span>
            <h1 className="text-6xl font-bold text-stone-950 mb-10 brand-font tracking-tight leading-tight">Consult with The Garden Architect</h1>
            <p className="text-xl text-stone-500 mb-16 leading-relaxed serif-text italic">
              We welcome commissions for residential estates, corporate landscapes, and heritage restorations. By appointment only.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-20">
              <div className="border-t border-stone-200 pt-8">
                <h4 className="font-bold text-stone-400 uppercase text-[10px] tracking-[0.4em] mb-4">Direct Dial</h4>
                <p className="text-lg text-emerald-950 font-bold tracking-widest">+1 (416) 882-7342</p>
              </div>
              
              <div className="border-t border-stone-200 pt-8">
                <h4 className="font-bold text-stone-400 uppercase text-[10px] tracking-[0.4em] mb-4">Correspondence</h4>
                <p className="text-lg text-emerald-950 font-bold tracking-tight">studio@thegardenarchitect.ca</p>
              </div>

              <div className="border-t border-stone-200 pt-8 sm:col-span-2">
                <h4 className="font-bold text-stone-400 uppercase text-[10px] tracking-[0.4em] mb-4">The Garden Architect</h4>
                <p className="text-lg text-stone-800 font-medium serif-text italic">101 Bloomington Road, Richmond Hill<br/>Ontario</p>
              </div>
            </div>

            <ServiceMap />
          </div>

          <div className="bg-white shadow-2xl border border-stone-100 p-12 md:p-20 relative">
            <div className="absolute top-0 right-0 w-2 h-full bg-emerald-950"></div>
            {sent ? (
              <div className="text-center py-24 animate-fade-in">
                <div className="w-20 h-20 border border-emerald-900 flex items-center justify-center mx-auto mb-8 text-emerald-900 text-sm tracking-[0.3em] font-bold uppercase">SENT</div>
                <h3 className="text-3xl font-bold text-stone-950 mb-6 brand-font">Message Logged</h3>
                <p className="text-stone-500 serif-text italic leading-relaxed mb-4">The Garden Architect has received your correspondence. A principal will respond within one business cycle.</p>
                <div className="flex items-center justify-center gap-2 bg-emerald-50 py-2 rounded-sm border border-emerald-100">
                  <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></div>
                  <p className="text-[8px] font-bold text-emerald-800 uppercase tracking-widest">Notification Dispatch Confirmed</p>
               </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 gap-10">
                  <div className="border-b border-stone-100 pb-2">
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.4em] mb-4">Full Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-transparent outline-none transition-all serif-text text-xl placeholder:text-stone-100"
                      value={formData.name}
                      placeholder="Enter Name..."
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="border-b border-stone-100 pb-2">
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.4em] mb-4">Email Address</label>
                    <input 
                      type="email" 
                      required
                      className="w-full bg-transparent outline-none transition-all serif-text text-xl placeholder:text-stone-100"
                      value={formData.email}
                      placeholder="Enter Email..."
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="border-b border-stone-100 pb-2">
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.4em] mb-4">Subject of Inquiry</label>
                  <select 
                    className="w-full bg-transparent outline-none transition-all serif-text text-lg cursor-pointer appearance-none"
                    value={formData.subject}
                    onChange={e => setFormData({...formData, subject: e.target.value})}
                  >
                    <option>Studio Commission</option>
                    <option>Institutional Maintenance</option>
                    <option>Residential Design</option>
                    <option>Artisan Partnerships</option>
                    <option>Press & Media</option>
                  </select>
                </div>

                <div className="border-b border-stone-100 pb-2">
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.4em] mb-4">Message Details</label>
                  <textarea 
                    rows={4}
                    required
                    className="w-full bg-transparent outline-none transition-all serif-text text-xl placeholder:text-stone-100 resize-none"
                    value={formData.message}
                    placeholder="Describe your property..."
                    onChange={e => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-950 text-white py-6 font-bold text-xs uppercase tracking-[0.4em] hover:bg-black transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-4"
                >
                  {loading ? (
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  ) : 'Dispatch Correspondence'}
                </button>
              </form>
            )}
            <div className="mt-12 pt-8 border-t border-stone-100 flex justify-between items-center opacity-30 grayscale">
               <span className="text-[8px] uppercase tracking-widest font-bold">Encrypted Connection</span>
               <div className="h-4 w-4 bg-stone-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
