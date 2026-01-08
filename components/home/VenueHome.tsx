
import React from 'react';

export const VenueHome = () => {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-purple-600/20 to-pink-600/20 blur-3xl opacity-50"></div>
            <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl h-[400px] md:h-[500px]">
              <img 
                src="https://res.cloudinary.com/dzss2fubc/image/upload/v1767555646/Venu_Image_lvptfw.jpg" 
                alt="Chowdiah Memorial Hall" 
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-8 left-8">
                <p className="text-white font-black uppercase text-xs tracking-[0.3em] mb-2">Iconic Landmark</p>
                <p className="text-2xl font-black text-white italic tracking-tighter"> Malleshwaram</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/5 text-purple-400 text-[10px] font-black uppercase tracking-[0.3em] italic">
              The Matrix Headquarters
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none">
              Chowdiah <br/> <span className="text-purple-600">Memorial Hall</span>
            </h2>
            <p className="text-zinc-400 text-lg font-medium leading-relaxed">
              Experience the summit at one of Bengaluru's most architecturally unique venues. Shaped like a violin, this iconic auditorium serves as the epicenter for deep-tech dialogue.
            </p>
            
            <div className="p-8 bg-zinc-900/50 rounded-3xl border border-white/5 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-black uppercase text-xs tracking-widest mb-1">Venue Address</p>
                  <p className="text-zinc-500 text-sm font-bold leading-relaxed">
                    16th Cross Rd, Vyalikaval, Kodandarampura, Malleshwaram, Bengaluru, Karnataka 560003
                  </p>
                </div>
              </div>

              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=Chowdiah+Memorial+Hall+Malleshwaram" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-white text-black py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-purple-600 hover:text-white transition-all shadow-xl"
              >
                Get Directions
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
