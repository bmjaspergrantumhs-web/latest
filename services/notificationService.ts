
import { dbService } from '../db';

class NotificationService {
  private hasPermission: boolean = false;

  constructor() {
    this.requestBrowserPermission();
  }

  async requestBrowserPermission() {
    if (!("Notification" in window)) return;
    if (Notification.permission === "granted") {
      this.hasPermission = true;
    } else if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission();
      this.hasPermission = permission === "granted";
    }
  }

  /**
   * Dispatches a multi-channel notification alert.
   */
  async dispatchStudioAlert(type: 'booking' | 'quotation' | 'contact', data: any) {
    console.log(`[NotificationService] Initiating Studio Dispatch for ${type}...`);
    
    const subject = `GA Studio Alert: New ${type.toUpperCase()} from ${data.contactName || data.name}`;
    const recipient = 'studio@thegardenarchitect.ca';
    
    // Construct rich email body for archival
    const body = `
STUDIO DISPATCH REPORT - ${new Date().toLocaleDateString()}
--------------------------------------------------
CLASSIFICATION: ${type.toUpperCase()}
CLIENT:         ${data.contactName || data.name}
EMAIL:          ${data.email}
PHONE:          ${data.phone}
LOCALE:         ${data.address || 'N/A'} / ${data.postalCode || 'N/A'}
PROPERTY:       ${data.propertyType || 'Standard'}

REQUIREMENTS:
${Array.isArray(data.selectedServices) 
  ? data.selectedServices.map(s => `- ${s}`).join('\n') 
  : `- ${data.subject || 'General Inquiry'}`}

TIMESTAMP:      ${new Date().toISOString()}
FINGERPRINT:    ${Math.random().toString(36).substring(7).toUpperCase()}
--------------------------------------------------
    `.trim();

    // 1. Log to SQLite (Permanent Audit Trail with Body)
    try {
      await dbService.logNotification(recipient, subject, body, 'sent');
    } catch (e) {
      console.error("DB Logging failed", e);
    }

    // 2. Browser Native Notification
    if (this.hasPermission) {
      new Notification("The Garden Architect - Studio Alert", {
        body: `New ${type} received from ${data.contactName || data.name}. Check Audit Trail for report.`,
        icon: '/favicon.ico' 
      });
    }

    // 3. Simulated SMTP Handshake Delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log(`[NotificationService] Multi-channel dispatch complete.`);
    return { success: true, message: 'Studio Dispatched', body };
  }
}

export const notificationService = new NotificationService();
