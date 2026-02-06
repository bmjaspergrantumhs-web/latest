
import React from 'react';
import SEO from '../components/SEO';
import { PAGE_METADATA } from '../constants';

const ARTICLES = [
  {
    id: '1',
    date: 'OCT 24, 2024',
    category: 'Botanical',
    title: 'Autumnal Dormancy: The Architect’s Approach to Winterization',
    excerpt: 'As the frost line descends, our protocols shift from growth maintenance to structural preservation.',
    image: 'https://images.unsplash.com/photo-1508197149814-0cc02e8b7f74?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    date: 'SEP 12, 2024',
    category: 'Heritage',
    title: 'The Forest Hill Restoration: 25 Years of Growth',
    excerpt: 'Revisiting our first estate commission to study the evolution of sculptural pruning over two decades.',
    image: 'https://images.unsplash.com/photo-1558905611-9257692224ed?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    date: 'AUG 05, 2024',
    category: 'Structural',
    title: 'Geometry in Greenspace: The Science of Living Walls',
    excerpt: 'An exploration of how we utilize high-density Taxus hedges to create sound-isolated outdoor rooms.',
    image: 'https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=80&w=800'
  }
];

const Journal = () => {
  return (
    <div className="bg-[#fcfbf7] min-h-screen">
      <SEO metadata={PAGE_METADATA.contact} /> {/* Reusing metadata or create specific if needed */}
      
      <section className="py-32 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-emerald-900 text-xs font-bold uppercase tracking-[0.6em] block mb-6">The Journal</span>
          <h1 className="text-6xl md:text-8xl font-bold text-stone-950 brand-font tracking-tight">Studio Insights</h1>
          <p className="mt-8 text-xl text-stone-500 serif-text italic max-w-2xl mx-auto">
            Dispatches from the terrain. Reflections on architectural horticulture and estate stewardship.
          </p>
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-40">
            {ARTICLES.map((article) => (
              <article key={article.id} className="group cursor-pointer">
                <div className="flex flex-col md:flex-row gap-16 items-start">
                  <div className="w-full md:w-1/3">
                    <div className="sticky top-40">
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.4em] mb-4">{article.date}</p>
                      <div className="w-8 h-px bg-emerald-900 mb-6"></div>
                      <p className="text-emerald-800 text-[10px] font-bold uppercase tracking-widest">{article.category}</p>
                    </div>
                  </div>
                  <div className="w-full md:w-2/3">
                    <div className="overflow-hidden mb-10 aspect-[16/9] shadow-2xl">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                      />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-stone-950 mb-6 brand-font leading-tight group-hover:text-emerald-900 transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-lg text-stone-500 serif-text italic leading-relaxed mb-8">
                      {article.excerpt}
                    </p>
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-900 flex items-center gap-4">
                      Read Dispatch <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Journal;
