import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES, PAGE_METADATA } from '../constants';
import SEO from '../components/SEO';
import { motion } from 'motion/react';

const ResidentialServices = () => {
  // Filter services that are highly relevant to residential
  const residentialServices = SERVICES.filter(s => 
    ['weekly-cutting', 'garden-maintenance', 'lawn-nutrition', 'seasonal-cleanup', 'soil-mulch', 'planting-services', 'hedge-trimming', 'sodding-overseeding', 'snow-plowing'].includes(s.id)
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
      <SEO metadata={PAGE_METADATA.residential} />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://plus.unsplash.com/premium_photo-1678656484475-1febee151440?auto=format&fit=crop&q=80&w=2000" 
            alt="Beautiful Residential Garden" 
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-[0.5em] block mb-6">Private Estates & Residences</span>
            <h1 className="text-6xl md:text-8xl font-bold mb-8 brand-font tracking-tight leading-none">
              Bespoke Care for <br /> Your Home Sanctuary
            </h1>
            <p className="text-xl md:text-2xl text-stone-200 max-w-2xl serif-text italic leading-relaxed mb-12">
              Elevating residential landscapes through meticulous attention to detail and a passion for botanical excellence.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link to="/booking?type=quote&property=residential" className="bg-emerald-600 text-white px-10 py-5 rounded-sm font-bold text-xs uppercase tracking-[0.4em] hover:bg-emerald-700 transition-all shadow-xl">
                Request Home Consultation
              </Link>
              <a href="#services" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-sm font-bold text-xs uppercase tracking-[0.4em] hover:bg-white/20 transition-all">
                Explore Services
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-stone-950 mb-8 brand-font">The Residential Standard</h2>
              <p className="text-lg text-stone-600 mb-8 leading-relaxed serif-text italic">
                We believe your garden is an extension of your home. Our residential team treats every property as if it were their own, ensuring that every blade of grass is perfectly cut and every flower bed is meticulously tended.
              </p>
              <ul className="space-y-4">
                {['Consistent Weekly Scheduling', 'Professional & Uniformed Staff', 'Premium Organic Fertilizers', 'Proactive Garden Health Monitoring'].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-stone-800 font-medium">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                      <svg className="w-3 h-3 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1734303023491-db8037a21f09?auto=format&fit=crop&q=80&w=1000" 
                alt="Residential Lawn Care" 
                className="w-full h-[500px] object-cover rounded-sm shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 -left-10 bg-emerald-950 text-white p-10 hidden md:block">
                <p className="text-3xl font-bold brand-font mb-2">100%</p>
                <p className="text-[10px] uppercase tracking-widest font-bold text-emerald-400">Satisfaction Guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section id="services" className="py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-48">
          <div className="text-center mb-24">
            <span className="text-emerald-600 text-xs font-bold uppercase tracking-[0.5em] block mb-6">Our Expertise</span>
            <h2 className="text-5xl md:text-6xl font-bold text-stone-950 brand-font">Residential Solutions</h2>
          </div>
          
          {residentialServices.map((service, index) => (
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

      {/* CTA Section */}
      <section className="py-32 bg-emerald-950 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 brand-font">Ready for a Pristine Property?</h2>
          <p className="text-xl text-emerald-100 mb-12 serif-text italic">
            Join hundreds of homeowners who trust The Garden Architect for their weekly maintenance and seasonal transformations.
          </p>
          <Link to="/booking?type=quote&property=residential" className="inline-block bg-white text-emerald-950 px-12 py-6 rounded-sm font-bold text-xs uppercase tracking-[0.4em] hover:bg-emerald-50 transition-all shadow-2xl">
            Get Your Free Estimate
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ResidentialServices;