
import React from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';
import { SERVICES } from '../constants';

const Footer = () => (
  <footer className="bg-stone-950 text-stone-400 pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="inline-block mb-8 brightness-150 grayscale contrast-200">
             <BrandLogo className="h-12" />
          </Link>
          <p className="text-sm leading-loose mb-8 serif-text italic">
            Maintaining Canada's finest private and public facilities with pristine grounds maintenance protocols since 2026.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-stone-600 hover:text-emerald-500 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="#" className="text-stone-600 hover:text-emerald-500 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.315 2c2.43 0 2.784.012 3.855.06 1.061.048 1.791.222 2.427.471.67.27 1.242.627 1.811 1.17.575.542.926 1.127 1.192 1.802.249.636.422 1.366.47 2.427.048 1.066.06 1.405.06 3.845s-.012 2.783-.06 3.848c-.048 1.063-.221 1.789-.47 2.425-.262.671-.612 1.242-1.155 1.811-.546.575-1.132.925-1.805 1.192-.633.249-1.363.422-2.424.47-1.06.048-1.41.06-3.85.06s-2.783-.012-3.849-.06c-1.062-.048-1.789-.221-2.425-.47-.671-.262-1.242-.612-1.811-1.155-.575-.546-.925-1.132-1.192-1.805-.249-.633-.422-1.363-.47-2.424-.048-1.06-.06-1.41-.06-3.85s.012-2.783.06-3.849c.048-1.062.221-1.789.47-2.425.262-.671.612-1.242 1.155-1.811.546-.575-1.132-.925 1.805-1.192.633-.249-1.363-.422 2.424-.47 1.06-.048 1.41-.06 3.85-.06zM12 2c-2.473 0-2.831.01-3.81.057-1.096.05-1.845.226-2.503.484-.683.265-1.264.62-1.842 1.198-.577.578-.933 1.159-1.198 1.842-.258.658-.434 1.407-.484 2.503C2.01 9.169 2 9.527 2 12s.01 2.831.057 3.81c.05 1.096.226 1.845.484 2.503.265.683.62 1.264 1.198 1.842.578.577 1.159.933 1.842 1.198.658.258 1.407.434 2.503.484.979.047 1.337.057 3.81.057s2.831-.01 3.81-.057c1.096-.05 1.845-.226 2.503-.484.683-.265 1.264-.62 1.842-1.198.577-.578.933-1.159 1.198-1.842.258-.658.434-1.407.484-2.503.047-.979.057-1.337.057-3.81s-.01-2.831-.057-3.81c-.05-1.096-.226-1.845-.484-2.503-.265-.683-.62-1.264-1.198-1.842-.578-.577-1.159-.933-1.842-1.198-.658-.258-1.407-.434-2.503-.484-.979-.047-1.337-.057-3.81-.057zM12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-8.925a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-stone-100 text-xs font-bold uppercase tracking-[0.3em] mb-8">Service Portfolio</h4>
          <ul className="space-y-4 text-sm font-medium">
            {SERVICES.slice(0, 5).map(service => (
              <li key={service.id}>
                <Link to={`/services/${service.id}`} className="hover:text-emerald-500 transition-colors">{service.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-stone-100 text-xs font-bold uppercase tracking-[0.3em] mb-8">Company</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link to="/about" className="hover:text-emerald-500 transition-colors">Our Vision & CEO</Link></li>
            <li><Link to="/gallery" className="hover:text-emerald-500 transition-colors">Recent Works</Link></li>
            <li><a href="#" className="hover:text-emerald-500 transition-colors">Commitment to Tidiness</a></li>
            <li><a href="#" className="hover:text-emerald-500 transition-colors">Safety Standards</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-stone-100 text-xs font-bold uppercase tracking-[0.3em] mb-8">Contact Information</h4>
          <p className="text-sm mb-6 leading-relaxed">Serving the finest facilities across Canada. Headquartered in Ontario.</p>
          <div className="border border-stone-800 p-6 rounded-sm">
            <p className="text-[10px] text-stone-500 uppercase tracking-widest mb-3">Service Window:</p>
            <p className="text-xs font-bold text-stone-300">Mon - Sat: 07:00 - 18:00</p>
            <p className="text-xs font-bold text-stone-300">24/7 Winter Response Available</p>
          </div>
        </div>
      </div>
      
      <div className="border-t border-stone-900 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-stone-600">
        <div className="flex flex-col gap-1">
          <p>&copy; 2026 The Garden Architect Company. All Rights Reserved.</p>
          <p className="opacity-50">Stewardship under Mr. Boakai Kamara, CEO.</p>
        </div>
        <Link to="/admin" className="opacity-0 hover:opacity-100 transition-opacity font-bold">Internal Audit</Link>
        <p className="mt-4 md:mt-0 font-bold">Toronto • Vancouver • Ottawa</p>
      </div>
    </div>
  </footer>
);

export default Footer;
