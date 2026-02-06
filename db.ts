
import { BookingData } from './types';

// Define the shape of our database entry
export interface DBLead extends BookingData {
  id?: number;
  type: 'booking' | 'quotation' | 'contact';
  created_at?: string;
}

export interface DBNotification {
  id?: number;
  recipient: string;
  subject: string;
  message_body: string;
  status: 'sent' | 'failed';
  timestamp: string;
}

export interface DBSystemLog {
  id?: number;
  event: string;
  details: string;
  timestamp: string;
}

class DatabaseService {
  private db: any = null;
  private SQL: any = null;
  private initialized: Promise<void>;

  constructor() {
    this.initialized = this.init();
  }

  private async init() {
    try {
      // @ts-ignore - initSqlJs is provided by the global script in index.html
      this.SQL = await window.initSqlJs({
        locateFile: (file: string) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}`
      });

      const savedDb = localStorage.getItem('garden_architect_db');
      if (savedDb) {
        const u8 = new Uint8Array(JSON.parse(savedDb));
        this.db = new this.SQL.Database(u8);
      } else {
        this.db = new this.SQL.Database();
        this.createTables();
      }
    } catch (err) {
      console.error("Failed to initialize SQLite:", err);
    }
  }

  private createTables() {
    this.db.run(`
      CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT,
        contactName TEXT,
        email TEXT,
        phone TEXT,
        address TEXT,
        postalCode TEXT,
        propertyType TEXT,
        selectedServices TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    this.db.run(`
      CREATE TABLE IF NOT EXISTS notifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        recipient TEXT,
        subject TEXT,
        message_body TEXT,
        status TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    this.db.run(`
      CREATE TABLE IF NOT EXISTS system_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event TEXT,
        details TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    this.persist();
  }

  private persist() {
    const data = this.db.export();
    localStorage.setItem('garden_architect_db', JSON.stringify(Array.from(data)));
  }

  async exportDatabase() {
    await this.initialized;
    const data = this.db.export();
    const blob = new Blob([data], { type: "application/x-sqlite3" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `garden_architect_backup_${new Date().toISOString().split('T')[0]}.sqlite`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    await this.logSystemEvent('Backup Exported', 'User triggered manual database export');
  }

  async logNotification(recipient: string, subject: string, body: string, status: 'sent' | 'failed') {
    await this.initialized;
    const stmt = this.db.prepare(`
      INSERT INTO notifications (recipient, subject, message_body, status)
      VALUES (?, ?, ?, ?)
    `);
    stmt.run([recipient, subject, body, status]);
    stmt.free();
    this.persist();
  }

  async logSystemEvent(event: string, details: string) {
    await this.initialized;
    const stmt = this.db.prepare(`
      INSERT INTO system_logs (event, details)
      VALUES (?, ?)
    `);
    stmt.run([event, details]);
    stmt.free();
    this.persist();
  }

  async saveLead(lead: DBLead) {
    await this.initialized;
    const stmt = this.db.prepare(`
      INSERT INTO leads (type, contactName, email, phone, address, postalCode, propertyType, selectedServices)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run([
      lead.type,
      lead.contactName,
      lead.email,
      lead.phone,
      lead.address,
      lead.postalCode,
      lead.propertyType,
      JSON.stringify(lead.selectedServices || [])
    ]);
    stmt.free();
    this.persist();
  }

  async getAllLeads(): Promise<DBLead[]> {
    await this.initialized;
    const res = this.db.exec("SELECT * FROM leads ORDER BY created_at DESC");
    if (res.length === 0) return [];
    
    const columns = res[0].columns;
    return res[0].values.map((row: any[]) => {
      const obj: any = {};
      columns.forEach((col: string, i: number) => {
        if (col === 'selectedServices') {
          obj[col] = JSON.parse(row[i] || '[]');
        } else {
          obj[col] = row[i];
        }
      });
      return obj as DBLead;
    });
  }

  async getAllNotifications(): Promise<DBNotification[]> {
    await this.initialized;
    const res = this.db.exec("SELECT * FROM notifications ORDER BY timestamp DESC");
    if (res.length === 0) return [];
    const columns = res[0].columns;
    return res[0].values.map((row: any[]) => {
      const obj: any = {};
      columns.forEach((col: string, i: number) => {
        obj[col] = row[i];
      });
      return obj as DBNotification;
    });
  }

  async getAllSystemLogs(): Promise<DBSystemLog[]> {
    await this.initialized;
    const res = this.db.exec("SELECT * FROM system_logs ORDER BY timestamp DESC");
    if (res.length === 0) return [];
    const columns = res[0].columns;
    return res[0].values.map((row: any[]) => {
      const obj: any = {};
      columns.forEach((col: string, i: number) => {
        obj[col] = row[i];
      });
      return obj as DBSystemLog;
    });
  }

  getDbSize(): number {
    const data = localStorage.getItem('garden_architect_db');
    return data ? data.length : 0;
  }
}

export const dbService = new DatabaseService();
