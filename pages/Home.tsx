
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES, TESTIMONIALS, PROJECTS, PAGE_METADATA } from '../constants';
import SEO from '../components/SEO';

const Home = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeProject, setActiveProject] = useState(0);

  const nextProject = () => {
    setActiveProject((prev) => (prev + 1) % PROJECTS.length);
  };

  const prevProject = () => {
    setActiveProject((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  useEffect(() => {
    const timer = setInterval(nextProject, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <SEO metadata={PAGE_METADATA.home} />
      
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1709734023466-b6f3d33817ae?auto=format&fit=crop&q=80&w=2000" 
            alt="Pristine lawn maintenance" 
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <span className="text-emerald-400 text-xs font-bold uppercase tracking-[0.6em] block mb-6 animate-fade-in">Established 2026</span>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 max-w-4xl leading-[1.1] tracking-tight brand-font">
            Grounds <span className="text-emerald-200 italic font-serif">Excellence</span> in Every Cut.
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-2xl text-stone-300 serif-text leading-relaxed">
            Professional maintenance for private and public facilities. We keep Canada's properties tidy, healthy, and professional.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link 
              to="/booking?type=quote" 
              className="bg-emerald-800 hover:bg-emerald-900 text-white px-10 py-5 rounded-sm font-bold text-xs uppercase tracking-[0.3em] transition-all shadow-xl text-center"
            >
              Get a Free Estimate
            </Link>
            <Link 
              to="/services" 
              className="bg-transparent hover:bg-white/5 text-white border border-white/20 px-10 py-5 rounded-sm font-bold text-xs uppercase tracking-[0.3em] transition-all text-center backdrop-blur-sm"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-stone-100 py-32 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-20 items-center">
            <div className="flex-1">
               <h2 className="text-4xl md:text-5xl font-bold text-emerald-950 mb-8 leading-tight">Professional Maintenance</h2>
               <p className="text-lg text-stone-600 mb-8 leading-relaxed serif-text italic">
                 "A tidy property is a professional property. We combine reliable scheduling with uncompromising quality to maintain the beauty and health of your grounds."
               </p>
               <p className="text-stone-500 mb-10 leading-loose">
                 The Garden Architect is Canada's newest leader in professional grounds keeping. Under CEO Boakai Kamara, we serve residential estates, commercial plazas, and public institutions with a full suite of maintenance solutions designed for the Canadian climate.
               </p>
               <div className="grid grid-cols-2 gap-8 text-center md:text-left">
                  <div>
                    <span className="text-3xl font-bold text-emerald-900 block mb-1">New</span>
                    <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">2026 Startup</span>
                  </div>
                  <div>
                    <span className="text-3xl font-bold text-emerald-900 block mb-1">Elite</span>
                    <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Service Standards</span>
                  </div>
               </div>
            </div>
            <div className="flex-1 w-full">
              <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-2xl relative">
                <img src="https://images.unsplash.com/photo-1709734023466-b6f3d33817ae?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Grounds maintenance work" />
                <div className="absolute inset-0 border-[20px] border-white/10 m-8"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-emerald-900 text-xs font-bold uppercase tracking-[0.5em] mb-6">Our Services</h2>
            <h3 className="text-5xl font-bold text-stone-950 mb-8 tracking-tight">Full-Spectrum Maintenance</h3>
            <div className="w-24 h-0.5 bg-emerald-800 mx-auto opacity-30"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {SERVICES.slice(0, 3).map((service) => (
              <div key={service.id} className="group flex flex-col">
                <div className="mb-10 overflow-hidden relative aspect-video rounded-sm shadow-sm">
                   <img src={`https://picsum.photos/600/400?random=${service.id}`} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={service.title} />
                   <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors"></div>
                </div>
                <h4 className="text-xl font-bold mb-4 text-emerald-950 uppercase tracking-widest">{service.title}</h4>
                <p className="text-stone-500 mb-8 leading-loose serif-text text-sm italic">
                  {service.description}
                </p>
                <Link to={`/services/${service.id}`} className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-900 hover:text-emerald-700 transition-colors mt-auto flex items-center">
                  Learn More <span className="ml-3 transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-20">
             <Link to="/services" className="text-xs font-bold uppercase tracking-[0.4em] border-b border-stone-200 pb-2 hover:border-emerald-900 transition-all">View All Maintenance Protocols</Link>
          </div>
        </div>
      </section>

      {/* Portfolio Carousel */}
      <section className="py-32 bg-stone-50 overflow-hidden border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 flex flex-col md:flex-row justify-between items-baseline gap-6">
          <div>
            <h2 className="text-emerald-900 text-xs font-bold uppercase tracking-[0.5em] mb-4">Gallery</h2>
            <h3 className="text-5xl font-bold text-stone-950 tracking-tight">Recent Commissions</h3>
          </div>
          <div className="flex items-center space-x-6">
             <button onClick={prevProject} className="w-12 h-12 border border-stone-200 flex items-center justify-center hover:bg-emerald-900 hover:text-white transition-all group">
                <span className="text-xl">←</span>
             </button>
             <button onClick={nextProject} className="w-12 h-12 border border-stone-200 flex items-center justify-center hover:bg-emerald-900 hover:text-white transition-all group">
                <span className="text-xl">→</span>
             </button>
          </div>
        </div>
        
        <div className="relative px-4 max-w-[1400px] mx-auto">
          <div className="overflow-hidden relative aspect-video md:aspect-[21/9] bg-stone-200">
            {PROJECTS.map((project, index) => (
              <div 
                key={project.id} 
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === activeProject ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'
                }`}
              >
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover brightness-[0.7]"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-20 bg-gradient-to-t from-stone-950/80 to-transparent">
                  <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-[0.6em] mb-4 animate-fade-in">{project.category}</p>
                  <h4 className="text-3xl md:text-5xl font-bold text-white brand-font tracking-tight mb-6">{project.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 bg-emerald-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Grass Texture" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h3 className="text-4xl md:text-6xl font-bold text-white mb-10 brand-font tracking-tight">Ready to Restore Your Property?</h3>
            <p className="text-emerald-200/60 text-lg md:text-xl mb-16 max-w-2xl mx-auto serif-text italic">
              Start your journey with Canada's newest leader in grounds maintenance excellence.
            </p>
            <div>
              <Link 
                to="/booking" 
                className="inline-block bg-[#fcfbf7] text-emerald-950 px-12 py-6 rounded-sm font-bold text-xs uppercase tracking-[0.4em] hover:bg-white transition-all shadow-2xl active:scale-95"
              >
                Request Your Quote Today
              </Link>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
