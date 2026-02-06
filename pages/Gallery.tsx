
import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import SEO from '../components/SEO';

const Gallery = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Residential', 'Commercial'];

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  return (
    <div className="bg-white min-h-screen">
      <SEO metadata={{ title: 'Gallery | The Garden Architect', description: 'Significant works of architectural landscaping.' }} />
      
      <section className="bg-stone-50 py-32 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div>
              <span className="text-emerald-900 text-xs font-bold uppercase tracking-[0.6em] block mb-6">Portfolio</span>
              <h1 className="text-6xl md:text-7xl font-bold text-stone-950 brand-font tracking-tight leading-none">Significant Works</h1>
            </div>
            
            <div className="flex gap-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`text-[10px] uppercase font-bold tracking-[0.4em] transition-all pb-2 border-b-2 ${
                    filter === cat ? 'text-emerald-900 border-emerald-900' : 'text-stone-300 border-transparent hover:text-stone-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group relative overflow-hidden bg-stone-100 aspect-[4/5]">
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/60 transition-all duration-500 flex flex-col justify-end p-10 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                <p className="text-emerald-400 text-[9px] font-bold uppercase tracking-[0.6em] mb-4">{project.category}</p>
                <h3 className="text-2xl font-bold text-white brand-font mb-2">{project.title}</h3>
                <div className="w-10 h-px bg-white/30"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-40 bg-stone-50 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-stone-950 brand-font mb-8">Have a Project in Mind?</h2>
          <p className="text-stone-500 serif-text italic text-lg mb-12 leading-relaxed">
            We are currently accepting commissions for the upcoming growing season. Our capacity is limited to ensure the highest architectural fidelity for every client.
          </p>
          <a 
            href="#/booking" 
            className="inline-block bg-emerald-950 text-white px-12 py-6 text-[10px] uppercase font-bold tracking-[0.4em] hover:bg-black transition-all shadow-2xl"
          >
            Request Private Consultation
          </a>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
