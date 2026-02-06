
import React from 'react';
import { Service, Testimonial, Project, Metadata } from './types';

export const SERVICES: Service[] = [
  {
    id: 'weekly-cutting',
    title: 'Weekly Grass Cutting',
    description: 'Precision mowing and pattern-focused turf maintenance for pristine lawns.',
    icon: 'W',
    longDescription: 'Our weekly grass cutting service is the foundation of a tidy property. We utilize high-performance equipment to ensure a uniform cut, professional edging, and thorough debris removal, giving your lawn a manicured look throughout the growing season.'
  },
  {
    id: 'garden-maintenance',
    title: 'Garden Maintenance',
    description: 'Specialized care for flower beds, shrubs, and ornamental features.',
    icon: 'G',
    longDescription: 'We keep your gardens healthy and aesthetic. Our team provides methodical weeding, pruning, deadheading, and soil cultivation to ensure your landscape remains vibrant and free of invasive growth.'
  },
  {
    id: 'lawn-nutrition',
    title: 'Lawn Care & Fertilizer Program',
    description: 'Science-based fertilization and weed control for a lush, healthy turf.',
    icon: 'N',
    longDescription: 'A thick, green lawn requires the right nutrients at the right time. Our fertilization programs are customized for Ontario soil, combining high-quality nutrients with proactive weed management to outcompete pests and drought.'
  },
  {
    id: 'seasonal-cleanup',
    title: 'Spring & Fall Yard Cleanup',
    description: 'Complete removal of leaves, debris, and seasonal preparation.',
    icon: 'S',
    longDescription: 'Transition your property safely between seasons. Our cleanup service involves deep leaf raking, gutter clearing (on request), perennial cutbacks, and debris haul-away to keep your grounds tidy and protected from pests.'
  },
  {
    id: 'soil-mulch',
    title: 'Soil & Mulch Installations',
    description: 'Premium substrate applications for moisture retention and aesthetic polish.',
    icon: 'C',
    longDescription: 'Fresh mulch and nutrient-rich soil provide an instant facelift. We professionally install a variety of premium mulches and triple-mix soils that suppress weeds, retain moisture, and define your garden borders.'
  },
  {
    id: 'planting-services',
    title: 'Planting Services',
    description: 'Expert installation of annuals, perennials, shrubs, and ornamental trees.',
    icon: 'P',
    longDescription: 'Enhance your curb appeal with professional planting. We select and install nursery-grade plants suitable for your specific sun and soil conditions, ensuring long-term health and visual impact.'
  },
  {
    id: 'hedge-trimming',
    title: 'Hedge Trimming',
    description: 'Straight-edge pruning for structural privacy and aesthetic symmetry.',
    icon: 'H',
    longDescription: 'Properly trimmed hedges define property boundaries and provide privacy. We specialize in straight-edge and sculptural pruning for cedar, boxwood, and other hedge varieties to maintain their shape and density.'
  },
  {
    id: 'sodding-overseeding',
    title: 'Sodding & Overseeding',
    description: 'Instant lawn replacement or gradual thickening of existing turf.',
    icon: 'T',
    longDescription: 'Transform bare patches into lush greenspace. We provide high-quality Kentucky Bluegrass sod installation for instant results, or deep overseeding and top-dressing to thicken and strengthen existing lawns.'
  },
  {
    id: 'snow-plowing',
    title: 'Snow Plowing',
    description: 'Reliable winter access management for driveways and commercial lots.',
    icon: 'Z',
    longDescription: 'When winter hits, we keep your property accessible. Our reliable snow plowing and salting services prioritize safety and convenience, ensuring clear paths even during the heaviest Canadian snowfalls.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    author: 'James T.',
    role: 'Homeowner, Markham',
    content: 'The Garden Architect team is incredibly reliable. Our lawn has never looked this tidy. The weekly grass cutting is always on time.',
    rating: 5
  },
  {
    id: '2',
    author: 'Facility Manager',
    role: 'Oakville Business Park',
    content: 'Professional grounds maintenance that actually takes pride in the work. Their seasonal cleanups are thorough and fast.',
    rating: 5
  },
  {
    id: '3',
    author: 'Sarah M.',
    role: 'Residential Client',
    content: 'Mr. Kamara and his team transformed our overgrown yard with a professional spring cleanup and fresh mulch. Exceptional value.',
    rating: 5
  }
];

export const PROJECTS: Project[] = [
  { id: 'p1', title: 'Estate Lawn Maintenance', category: 'Residential', imageUrl: 'https://images.unsplash.com/photo-1734303023491-db8037a21f09?auto=format&fit=crop&q=80&w=800' },
  { id: 'p2', title: 'Snow Clearing', category: 'Commercial', imageUrl: 'https://images.unsplash.com/photo-1629818571630-5523061def62?auto=format&fit=crop&q=80&w=800' },
  { id: 'p3', title: 'Garden Bed Restoration', category: 'Residential', imageUrl: 'https://images.unsplash.com/photo-1611843467160-25afb8df1074?auto=format&fit=crop&q=80&w=800' },
  { id: 'p4', title: 'Seeding', category: 'Commercial', imageUrl: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=800' },
  { id: 'p5', title: 'Hedge Trimming', category: 'Residential', imageUrl: 'https://plus.unsplash.com/premium_photo-1678656484475-1febee151440?auto=format&fit=crop&q=80&w=800' },
  { id: 'p6', title: 'Sod Installation Elite', category: 'Residential', imageUrl: 'https://plus.unsplash.com/premium_photo-1661412696440-044ac49f9cf4?auto=format&fit=crop&q=80&w=800' },
   { id: 'p7', title: 'Spring & Fall yard cleaning', category: 'Commercial', imageUrl: 'https://images.unsplash.com/photo-1635878139456-2459d314d961?auto=format&fit=crop&q=80&w=800' }
];

export const PAGE_METADATA: Record<string, Metadata> = {
  home: {
    title: 'The Garden Architect | Professional Grounds Maintenance Canada',
    description: 'Leading provider of lawn care, grass cutting, and grounds maintenance for private and public facilities across Canada. Founded by Boakai Kamara.',
    keywords: ['grass cutting', 'lawn care', 'snow plowing', 'grounds maintenance Canada', 'The Garden Architect'],
    openGraph: {
      title: 'Professional Grounds Maintenance | The Garden Architect',
      description: 'Maintaining pristine outdoor spaces for homes and businesses. Quality service you can trust.',
      images: [{ url: 'https://images.unsplash.com/photo-1734303023491-db8037a21f09?auto=format&fit=crop&q=80&w=800', alt: 'The Garden Architect' }],
      siteName: 'The Garden Architect'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'The Garden Architect - Professional Maintenance',
      images: ['https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=1200&h=630&fit=crop']
    }
  },
  services: {
    title: 'Maintenance Services | The Garden Architect',
    description: 'Comprehensive landscaping services including grass cutting, snow plowing, hedge trimming, and seasonal cleanups.',
    keywords: ['grass cutting', 'hedge trimming', 'sodding', 'snow plowing', 'planting services'],
    openGraph: {
      title: 'Our Maintenance Services - The Garden Architect',
      description: 'Professional grounds keeping for all properties.',
      images: [{ url: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=1200&h=630&fit=crop' }]
    }
  },
  about: {
    title: 'About Us | The Garden Architect Company',
    description: 'Founded in 2026 by CEO Boakai Kamara, The Garden Architect aims to lead Canada in premium grounds maintenance.',
    openGraph: {
      title: 'Our Mission - The Garden Architect',
      description: 'Under the stewardship of Mr. Boakai Kamara, we are redefining property maintenance.',
      images: [{ url: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=1200&h=630&fit=crop' }]
    }
  },
  booking: {
    title: 'Get a Quote | The Garden Architect',
    description: 'Request a professional estimate for your grass cutting, landscaping, or snow plowing needs.',
    openGraph: {
      title: 'Quote Request - The Garden Architect',
      description: 'Start your property maintenance plan today.'
    }
  },
  contact: {
    title: 'Contact Us | The Garden Architect',
    description: 'Reach out to The Garden Architect for commercial or residential grounds maintenance inquiries.',
    openGraph: {
      title: 'Contact The Garden Architect',
      description: 'Speak with our team about your maintenance needs.'
    }
  }
};
