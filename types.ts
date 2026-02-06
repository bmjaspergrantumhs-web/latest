
export enum PropertyType {
  RESIDENTIAL = 'Residential',
  COMMERCIAL = 'Commercial'
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  longDescription: string;
  priceEstimate?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  content: string;
  rating: number;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export interface BookingData {
  postalCode: string;
  propertyType: PropertyType;
  selectedServices: string[];
  contactName: string;
  email: string;
  address: string;
  phone: string;
}

export interface Metadata {
  title: string;
  description: string;
  keywords?: string[];
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    siteName?: string;
    images?: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
    locale?: string;
    type?: string;
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    images?: string[];
  };
}

// New Notification Types
export type NotificationType = 'success' | 'info' | 'error' | 'warning';

export interface StudioToast {
  id: string;
  message: string;
  type: NotificationType;
}
