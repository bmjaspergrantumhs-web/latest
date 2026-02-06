
import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES, PAGE_METADATA } from '../constants';
import SEO from '../components/SEO';

const Services = () => {
  // Mapping specific images to services for a better visual fit
  const serviceImages: Record<string, string> = {
    'weekly-grass-cutting': 'https://images.unsplash.com/photo-1746436576978-21632bf9790d?auto=format&fit=crop&q=80&w=800',
    'garden-maintenance': 'https://images.unsplash.com/photo-1709734023466-b6f3d33817ae?auto=format&fit=crop&q=80&w=800',
    'lawn-nutrition': 'https://images.unsplash.com/photo-1734303023491-db8037a21f09?auto=format&fit=crop&q=80&w=800',
    'seasonal-cleanup': 'https://images.unsplash.com/photo-1635878139456-2459d314d961?auto=format&fit=crop&q=80&w=800',
    'soil-mulch': 'https://images.unsplash.com/photo-1737044225787-ef49f031ff79?auto=format&fit=crop&q=80&w=800',
    'planting-services': 'https://images.unsplash.com/photo-1621460248083-6271cc4437a8?auto=format&fit=crop&q=80&w=800',
    'hedge-trimming': 'https://plus.unsplash.com/premium_photo-1678656484475-1febee151440?auto=format&fit=crop&q=80&w=800',
    'sodding-overseeding': 'https://plus.unsplash.com/premium_photo-1661412696440-044ac49f9cf4?auto=format&fit=crop&q=80&w=800',
    'snow-plowing': 'https://images.unsplash.com/photo-1642586078463-a2582692fcc6?auto=format&fit=crop&q=80&w=800'
  };

  return (
    <div className="bg-[#fcfbf7]">
      <SEO metadata={PAGE_METADATA.services} />
      
      {/* Header */}
      <section className="bg-emerald-950 py-32 border-b border-stone-200 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-emerald-400 text-xs font-bold uppercase tracking-[0.5em] block mb-6">Service Catalog</span>
          <h1 className="text-6xl md:text-7xl font-bold mb-10 brand-font tracking-tight">Maintenance Solutions</h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto serif-text italic leading-relaxed">
            From precision weekly grass cutting to strategic snow management, we ensure your facility remains pristine and professional in every season.
          </p>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-48">
          {SERVICES.map((service, index) => (
            <div key={service.id} className={`flex flex-col md:flex-row items-center gap-24 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="flex-1">
                <div className="inline-block px-5 py-2 border border-emerald-900/20 text-emerald-900 text-[10px] font-bold uppercase tracking-[0.4em] mb-10">
                  {`Section ${String(index + 1).padStart(2, '0')}`}
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-stone-950 mb-8 brand-font">{service.title}</h2>
                <p className="text-lg text-stone-600 mb-10 leading-relaxed serif-text italic">
                  {service.description}
                </p>
                
                <div className="flex flex-col space-y-4 items-start border-t border-stone-100 pt-10">
                  <Link 
                    to={`/services/${service.id}`}
                    className="inline-block bg-emerald-900 text-white px-10 py-5 rounded-sm font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-emerald-950 transition-all shadow-lg active:scale-95 text-center min-w-[240px]"
                  >
                    View Details
                  </Link>
                  <Link 
                    to={`/booking?type=quote&service=${service.id}`} 
                    className="inline-block bg-stone-100 text-emerald-950 px-10 py-5 rounded-sm font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-stone-200 transition-all shadow-sm active:scale-95 text-center min-w-[240px] border border-stone-200"
                  >
                    Request a Quote
                  </Link>
                </div>
              </div>
              <div className="flex-1 w-full">
                <div className="relative group">
                   <div className="absolute inset-0 border border-emerald-900/10 translate-x-6 translate-y-6 -z-10 group-hover:translate-x-8 group-hover:translate-y-8 transition-transform"></div>
                   <img 
                    src={serviceImages[service.id] || `https://picsum.photos/1000/800?random=${service.id}`} 
                    alt={service.title} 
                    className="relative w-full h-auto object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 aspect-[4/3]"
                   />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Corporate Focus */}
      <section className="bg-stone-950 py-40 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-900/10 -skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
             <div>
               <span className="text-emerald-400 text-xs font-bold uppercase tracking-[0.5em] block mb-8">Public & Private Facilities</span>
               <h2 className="text-5xl md:text-6xl font-bold mb-10 leading-tight brand-font">Reliable Stewardship</h2>
               <p className="text-xl text-stone-400 mb-12 leading-relaxed serif-text italic">
                 The Garden Architect is built for scale. We manage high-traffic commercial environments, public parks, and private estates with the same rigorous commitment to tidiness.
               </p>
               <Link to="/booking?type=booking" className="bg-white text-emerald-950 px-10 py-5 rounded-sm font-bold text-xs uppercase tracking-[0.4em] hover:bg-emerald-50 transition-all shadow-xl inline-block">
                 Request Enterprise Quote
               </Link>
             </div>
             <div className="relative">
                <img src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1000" alt="Professional Facility Maintenance" className="w-full h-[600px] object-cover grayscale brightness-75 shadow-2xl border border-white/10" />
             </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
