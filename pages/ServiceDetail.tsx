
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SERVICES } from '../constants';
import SEO from '../components/SEO';

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const service = SERVICES.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!service) {
      navigate('/services');
    }
  }, [service, navigate]);

  if (!service) return null;

  return (
    <div className="bg-[#fcfbf7] min-h-screen">
      <SEO metadata={{ 
        title: `${service.title} | The Garden Architect`, 
        description: service.description 
      }} />

      {/* Breadcrumb / Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link to="/services" className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 hover:text-emerald-900 transition-colors flex items-center gap-2">
          <span>←</span> Back to Collection
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden mb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="flex-1 animate-fade-in">
              <span className="text-emerald-900 text-xs font-bold uppercase tracking-[0.5em] block mb-8">Architectural Protocol</span>
              <h1 className="text-5xl md:text-7xl font-bold text-stone-950 mb-10 brand-font tracking-tight leading-tight">
                {service.title}
              </h1>
              <p className="text-xl text-stone-500 serif-text italic leading-relaxed mb-12">
                {service.description}
              </p>
              <div className="w-16 h-1 bg-emerald-900/20"></div>
            </div>
            <div className="flex-1 w-full">
              <div className="aspect-[4/3] bg-stone-100 shadow-2xl relative overflow-hidden">
                <img 
                  src={`https://picsum.photos/1200/900?random=${service.id}`} 
                  alt={service.title} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive Section */}
      <section className="py-32 bg-white border-y border-stone-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-20">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-stone-400 mb-10">The Studio Standard</h2>
            <p className="text-2xl md:text-3xl text-stone-800 leading-relaxed brand-font">
              {service.longDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="border-l-2 border-emerald-900 pl-8">
              <h4 className="text-sm font-bold uppercase tracking-widest text-stone-900 mb-4">Quality Rigor</h4>
              <p className="text-sm text-stone-500 leading-relaxed serif-text italic">
                We employ surgical-grade precision in all maintenance tasks. From blade sharpening frequencies to nutrient balance testing, our protocols are unmatched in the industry.
              </p>
            </div>
            <div className="border-l-2 border-emerald-900 pl-8">
              <h4 className="text-sm font-bold uppercase tracking-widest text-stone-900 mb-4">Ecological Balance</h4>
              <p className="text-sm text-stone-500 leading-relaxed serif-text italic">
                Our approach is calibrated to the local Ontario micro-climate. We prioritize the long-term health of the soil and local flora to ensure architectural endurance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Context */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <img src={`https://picsum.photos/800/600?random=${service.id}_1`} className="w-full h-80 object-cover grayscale brightness-90 shadow-lg" alt="Detail 1" />
            <img src={`https://picsum.photos/800/600?random=${service.id}_2`} className="w-full h-80 object-cover grayscale brightness-90 shadow-lg md:mt-12" alt="Detail 2" />
            <img src={`https://picsum.photos/800/600?random=${service.id}_3`} className="w-full h-80 object-cover grayscale brightness-90 shadow-lg" alt="Detail 3" />
          </div>
        </div>
      </section>

      {/* Service CTA Section */}
      <section className="py-40 bg-stone-950 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Texture" />
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-[0.5em] block mb-8">Commissioning</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-10 brand-font tracking-tight">Engage The Studio for {service.title}</h2>
          <p className="text-stone-400 serif-text italic text-lg mb-16 leading-relaxed max-w-2xl mx-auto">
            Our capacity for the current season is limited. We recommend early engagement to secure our architectural maintenance protocols for your property.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to={`/booking?type=booking&service=${service.id}`}
              className="bg-emerald-800 text-white px-12 py-6 rounded-sm font-bold text-xs uppercase tracking-[0.4em] hover:bg-emerald-900 transition-all shadow-2xl"
            >
              Book Service
            </Link>
            <Link 
              to={`/booking?type=quote&service=${service.id}`}
              className="bg-white text-emerald-950 px-12 py-6 rounded-sm font-bold text-xs uppercase tracking-[0.4em] hover:bg-stone-100 transition-all shadow-2xl"
            >
              Request Quotation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
