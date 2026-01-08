import React from 'react';

export const Summit = () => {
  return (
    <section className="py-20 sm:py-32 bg-black relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-purple-600/10 rounded-full blur-[100px] sm:blur-[120px] animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-fuchsia-600/10 rounded-full blur-[100px] sm:blur-[120px] animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="relative p-1 rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-br from-white/10 via-transparent to-white/5 overflow-hidden group">
          {/* Animated border glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-fuchsia-500/40 to-purple-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-[2s] ease-in-out"></div>

          <div className="relative bg-zinc-950/90 backdrop-blur-xl rounded-[1.9rem] sm:rounded-[2.4rem] p-6 sm:p-12 md:p-24 border border-white/5">
            <div className="max-w-4xl mx-auto text-center">

              {/* Date Highlight Badge */}
              <div className="inline-flex items-center gap-3 px-4 sm:px-6 py-2 mb-6 rounded-full border-2 border-fuchsia-500 bg-fuchsia-500/10 shadow-[0_0_20px_rgba(219,39,119,0.3)] animate-bounce">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-fuchsia-500"></span>
                </span>
                <span className="text-white font-black uppercase tracking-widest text-sm sm:text-lg">
                  30 January 2026
                </span>
              </div>

              <div className="inline-block px-4 py-1.5 mb-6 sm:mb-8 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/5 text-fuchsia-400 text-xs sm:text-sm font-black uppercase tracking-[0.25em] italic">
                The Grand Opening
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-8xl font-black text-white mb-8 sm:mb-10 tracking-tighter uppercase italic leading-tight sm:leading-[0.9]">
                The{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-fuchsia-200 to-white">
                  Inauguration
                </span>
                <br />
                <span className="text-fuchsia-500">Summit</span>
              </h2>

              <div className="relative">
                <p className="text-lg sm:text-2xl md:text-3xl text-gray-300 leading-relaxed sm:leading-snug mb-10 sm:mb-12 font-medium">
                  The inauguration of 'Ascent Matrix' is not merely the launch of a new forum; it is the{' '}
                  <span className="relative inline-block text-white font-bold">
                    signing of a collective social contract
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-[0_5px_15px_rgba(219,39,119,0.4)]"></span>
                  </span>{' '}
                  between the architects of policy and the practitioners of innovation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 mt-14 sm:mt-16 text-left border-t border-white/10 pt-12 sm:pt-16">
                <div>
                  <p className="text-base sm:text-lg text-gray-400 leading-relaxed italic border-l-4 border-fuchsia-600 pl-5 sm:pl-6">
                    "We call upon all stakeholders to commit to the QUC, transforming the promise of India's innovation ecosystem into a visible, measurable, and irreversible reality for national prosperity."
                  </p>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-fuchsia-600 uppercase italic tracking-tighter leading-tight">
                    "From the idea of an ecosystem to the engine of a nation."
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
