
import React from 'react';
import { PAGE_METADATA } from '../constants';
import SEO from '../components/SEO';

const About = () => {
  return (
    <div className="bg-[#fcfbf7]">
      <SEO metadata={PAGE_METADATA.about} />
      
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1709734023466-b6f3d33817ae?auto=format&fit=crop&q=80&w=2000" 
            alt="Professional lawn maintenance" 
            className="w-full h-full object-cover brightness-[0.5]"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-center">
          <span className="text-emerald-400 text-xs font-bold uppercase tracking-[0.5em] block mb-6">Our Vision</span>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 brand-font">Pioneering Maintenance</h1>
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto serif-text italic text-stone-200">
            Founded in 2026, aiming to become Canada's leading provider of professional grounds maintenance.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-32 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-4 sticky top-32">
             <h2 className="text-3xl font-bold text-emerald-950 mb-6 uppercase tracking-widest border-l-4 border-emerald-800 pl-6">The Journey</h2>
             <p className="text-stone-400 text-sm tracking-widest uppercase font-bold mb-12">Founded in Canada, 2026</p>
          </div>
          <div className="md:col-span-8 prose prose-stone max-w-none">
            <p className="text-xl text-stone-700 mb-10 leading-relaxed serif-text italic border-b border-stone-100 pb-10">
              The Garden Architect was established as a high-performance grounds maintenance company for private and public facilities. Our goal is simple: to provide reliable, professional, and pristine outdoor maintenance services that allow properties to shine.
            </p>
            <p className="text-stone-600 mb-10 leading-loose">
              Under the stewardship of <strong>Mr. Boakai Kamara, CEO</strong>, The Garden Architect is entering its startup year with a bold ambition. We are not just another landscaping firm; we are a technology-forward maintenance partner focused on transparency, reliability, and excellence in execution.
            </p>
            <div className="bg-emerald-900 p-12 md:p-16 rounded-sm text-white mb-12 shadow-2xl relative overflow-hidden">
              <div className="absolute -right-20 -bottom-20 opacity-10 w-64 h-64">
                <svg viewBox="0 0 100 100" fill="currentColor"><path d="M50 10 L10 90 L90 90 Z" /></svg>
              </div>
              <h3 className="text-xs uppercase tracking-[0.5em] font-bold text-emerald-400 mb-6">CEO's Message</h3>
              <p className="text-2xl serif-text italic leading-relaxed">
                "Our mission is to maintain Canada's most vital private and public spaces with a level of tidiness and care that reflects the professionalism of our clients. We build trust through every cut, every plant, and every cleared path."
              </p>
              <p className="mt-8 text-xs font-bold uppercase tracking-widest text-emerald-300">— Boakai Kamara, CEO</p>
            </div>
            <p className="text-stone-600 leading-loose">
              We offer everything from weekly grass cutting to complex industrial snow management. By utilizing modern logistics and a highly trained workforce, we ensure that your facility remains safe, tidy, and welcoming year-round.
            </p>
          </div>
        </div>
      </section>

      {/* Leaders */}
      <section className="py-32 bg-stone-100 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-24">
             <h2 className="text-emerald-900 text-xs font-bold uppercase tracking-[0.4em] mb-4">Our Leadership</h2>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-center">
             {[
               { name: 'Mr. Boakai Kamara', role: 'Chief Executive Officer (CEO)', img: 'https://images.unsplash.com/photo-1770222904674-b6750e6a6846?auto=format&fit=crop&q=80&w=400' },
               { name: 'Dr. Elijah Caldwell', role: 'Board Chair', img: 'https://images.unsplash.com/photo-1770223085225-23b677833424?auto=format&fit=crop&q=80&w=400' },
               { name: 'Rev. Sr. Lois Swen', role: 'Board of Directors', img: 'https://images.unsplash.com/photo-1770223085117-828d8167c662?auto=format&fit=crop&q=80&w=400' },
             ].map((member, i) => (
               <div key={i} className="group bg-[#fcfbf7] p-4 shadow-sm hover:shadow-2xl transition-all border border-stone-200">
                 <div className="mb-8 overflow-hidden aspect-[1/1] relative">
                   <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-transform duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-105" />
                 </div>
                 <h4 className="text-lg font-bold text-stone-900 uppercase tracking-widest">{member.name}</h4>
                 <p className="text-emerald-800 text-[10px] font-bold uppercase tracking-widest mt-2">{member.role}</p>
               </div>
             ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default About;
