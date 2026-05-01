
import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES, PAGE_METADATA } from '../constants';
import SEO from '../components/SEO';
import { motion } from 'motion/react';

const CommercialServices = () => {
  // Filter services that are highly relevant to commercial
  const commercialServices = SERVICES.filter(s => 
    ['weekly-cutting', 'lawn-nutrition', 'seasonal-cleanup', 'snow-plowing', 'soil-mulch', 'hedge-trimming', 'sodding-overseeding'].includes(s.id)
  );

  // Mapping specific images to services for a better visual fit
  const serviceImages: Record<string, string> = {
    'weekly-cutting': 'https://images.unsplash.com/photo-1746436576978-21632bf9790d?auto=format&fit=crop&q=80&w=800',
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
      <SEO metadata={PAGE_METADATA.commercial} />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1642586078463-a2582692fcc6?auto=format&fit=crop&q=80&w=2000" 
            alt="Commercial Facility Grounds" 
            className="w-full h-full object-cover brightness-50 grayscale"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-[0.5em] block mb-6">Corporate & Industrial Facilities</span>
            <h1 className="text-6xl md:text-8xl font-bold mb-8 brand-font tracking-tight leading-none">
              Reliable Grounds <br /> Management at Scale
            </h1>
            <p className="text-xl md:text-2xl text-stone-300 max-w-2xl serif-text italic leading-relaxed mb-12">
              Ensuring your business environment remains professional, accessible, and pristine through rigorous maintenance protocols.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link to="/booking?type=quote&property=commercial" className="bg-white text-emerald-950 px-10 py-5 rounded-sm font-bold text-xs uppercase tracking-[0.4em] hover:bg-emerald-50 transition-all shadow-xl">
                Request Facility Audit
              </Link>
              <a href="#commercial-focus" className="bg-emerald-900/40 backdrop-blur-md text-white border border-emerald-800/20 px-10 py-5 rounded-sm font-bold text-xs uppercase tracking-[0.4em] hover:bg-emerald-900/60 transition-all">
                Our Capabilities
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition */}
      <section id="commercial-focus" className="py-32 bg-stone-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="p-10 border border-white/10 bg-white/5">
              <div className="text-emerald-400 text-4xl mb-6 font-bold brand-font">01</div>
              <h3 className="text-2xl font-bold mb-6 brand-font">Risk Mitigation</h3>
              <p className="text-stone-400 leading-relaxed serif-text italic">
                Our proactive snow management and debris clearing protocols minimize liability and ensure safe access for employees and clients alike.
              </p>
            </div>
            <div className="p-10 border border-white/10 bg-white/5">
              <div className="text-emerald-400 text-4xl mb-6 font-bold brand-font">02</div>
              <h3 className="text-2xl font-bold mb-6 brand-font">Brand Image</h3>
              <p className="text-stone-400 leading-relaxed serif-text italic">
                Your exterior is your first impression. We maintain high-visibility areas with surgical precision to reflect your corporate excellence.
              </p>
            </div>
            <div className="p-10 border border-white/10 bg-white/5">
              <div className="text-emerald-400 text-4xl mb-6 font-bold brand-font">03</div>
              <h3 className="text-2xl font-bold mb-6 brand-font">Operational Scale</h3>
              <p className="text-stone-400 leading-relaxed serif-text italic">
                Equipped for large-scale facilities, we manage business parks, retail centers, and public institutions with consistent, high-volume capacity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-48">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-12">
            <div className="max-w-2xl">
              <span className="text-emerald-600 text-xs font-bold uppercase tracking-[0.5em] block mb-6">Enterprise Solutions</span>
              <h2 className="text-5xl md:text-6xl font-bold text-stone-950 brand-font">Facility Maintenance</h2>
            </div>
          </div>
          
          {commercialServices.map((service, index) => (
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
                    src={serviceImages[service.id] || "https://images.unsplash.com/photo-1709734023466-b6f3d33817ae?auto=format&fit=crop&q=80&w=1000"} 
                    alt={service.title} 
                    className="relative w-full h-auto object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 aspect-[4/3]"
                   />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-emerald-950 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
            <div>
              <p className="text-5xl font-bold brand-font mb-4">24/7</p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-emerald-400">Winter Response</p>
            </div>
            <div>
              <p className="text-5xl font-bold brand-font mb-4">100%</p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-emerald-400">Compliance Rate</p>
            </div>
            <div>
              <p className="text-5xl font-bold brand-font mb-4">50+</p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-emerald-400">Corporate Partners</p>
            </div>
            <div>
              <p className="text-5xl font-bold brand-font mb-4">0</p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-emerald-400">Safety Incidents</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 bg-[#fcfbf7]">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-10 brand-font text-stone-950">Secure Your Facility's Future</h2>
          <p className="text-xl text-stone-600 mb-16 serif-text italic max-w-3xl mx-auto">
            Partner with Canada's emerging leader in professional grounds maintenance. We provide the reliability your operations demand.
          </p>
          <Link to="/booking?type=quote&property=commercial" className="bg-emerald-950 text-white px-12 py-6 rounded-sm font-bold text-xs uppercase tracking-[0.4em] hover:bg-black transition-all shadow-2xl inline-block">
            Request Enterprise Proposal
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CommercialServices;