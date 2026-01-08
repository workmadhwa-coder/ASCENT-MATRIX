import React from 'react';
import { POLICY_MAKERS, FOUNDERS } from '../../constants';

const SectionHeader = ({ title }: { title: string }) => (
  <div className="text-center mb-16">
    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 uppercase tracking-tight">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400">
        {title}
      </span>
    </h2>
    <div className="w-24 h-1.5 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full"></div>
  </div>
);

export const People = () => {
  return (
    <>
      {/* Policy Makers */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <SectionHeader title="Policy Makers" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {POLICY_MAKERS.map((guest) => (
            <div key={guest.id} className="group relative h-[450px] w-full overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 cursor-pointer shadow-2xl">
              <img 
                src={guest.image} 
                alt={guest.name} 
                className="w-full h-full object-cover object-top filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700 ease-in-out transform group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-md tracking-tight group-hover:text-purple-300 transition-colors">{guest.name}</h3>
                <div className="h-1 w-12 bg-pink-600 mb-3 transition-all duration-500 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500"></div>
                <p className="text-fuchsia-400 font-bold text-sm md:text-base mb-3 uppercase tracking-wide leading-tight">{guest.designation}</p>
                <div className="overflow-hidden max-h-0 group-hover:max-h-40 transition-all duration-700 ease-in-out">
                    <p className="text-gray-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                        {guest.bio}
                    </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Founders & Investors */}
      <section className="py-24 px-4 bg-gradient-to-b from-black to-zinc-900 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeader title="Founders & Investors" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {FOUNDERS.map((speaker) => (
                <div key={speaker.id} className="group relative h-[350px] rounded-xl overflow-hidden cursor-pointer border border-zinc-800 hover:border-purple-500 transition-colors duration-500 shadow-xl bg-zinc-900">
                    <img 
                        src={speaker.image} 
                        alt={speaker.name} 
                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                    <div className="absolute bottom-0 w-full p-4 text-center">
                        <div className="transform transition-transform duration-500 translate-y-6 group-hover:translate-y-0">
                            <h4 className="text-xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">{speaker.name}</h4>
                            <p className="text-purple-400 text-xs uppercase tracking-wider font-bold mb-3 line-clamp-2 min-h-[32px]">{speaker.title}</p>
                            <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100">
                                 <div className="h-px w-10 bg-zinc-600 mx-auto mb-2"></div>
                                 <p className="text-gray-300 text-xs italic">{speaker.expertise}</p>
                            </div>
                        </div>
                    </div>
                </div>
             ))}
          </div>
        </div>
      </section>
    </>
  );
};