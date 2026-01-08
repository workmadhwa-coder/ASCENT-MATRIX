
import React from 'react';

const Venue = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2000" 
          alt="Chowdiah Memorial Hall" 
          className="w-full h-full object-cover grayscale brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center w-full px-4">
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase italic tracking-tighter mb-4 animate-fade-in-up">
            Chowdiah <br/> <span className="text-purple-600">Memorial Hall</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-2xl font-bold uppercase tracking-widest animate-fade-in-up delay-200">
            The Iconic Venue for Ascent Matrix 2026
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Info Block */}
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-6 flex items-center gap-4">
                <div className="h-10 w-1.5 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full"></div>
                About The Venue
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Chowdiah Memorial Hall is a premier auditorium in Bangalore, commissioned by the Academy of Music. 
                Built in the unique shape of a <span className="text-white font-bold italic">seven-stringed violin</span>, 
                it is a masterpiece of modern architecture and a cultural landmark of the city.
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed mt-4">
                This venue has hosted thousands of internationally acclaimed performances and summits, making it the 
                perfect stage for the convergence of tech leaders, policy makers, and innovators at Ascent Matrix.
              </p>
            </div>

            <div className="bg-zinc-900/50 p-10 rounded-[3rem] border border-white/5 shadow-2xl">
              <h3 className="text-white font-black uppercase text-xs tracking-[0.2em] mb-4 opacity-50">Location Details</h3>
              <p className="text-2xl font-black text-white mb-2 leading-tight">Chowdiah Memorial Hall</p>
              <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest leading-loose">
                16th Cross Rd, Vyalikaval, <br/>
                Kodandarampura, Malleshwaram, <br/>
                Bengaluru, Karnataka 560003
              </p>
              
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=Chowdiah+Memorial+Hall+Malleshwaram" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 mt-10 bg-white text-black px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all group"
              >
                Get Directions
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Visual Block */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-purple-600/20 to-pink-600/20 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200" 
                alt="Auditorium View" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all"></div>
            </div>
            {/* Stats */}
            <div className="absolute -bottom-10 -left-10 bg-zinc-900 border border-white/10 p-10 rounded-[2.5rem] shadow-2xl backdrop-blur-xl hidden md:block">
              <div className="flex gap-10">
                <div>
                  <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Capacity</p>
                  <p className="text-3xl font-black text-white">1,000+</p>
                </div>
                <div>
                  <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Parking</p>
                  <p className="text-3xl font-black text-white">Ample</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Venue;
