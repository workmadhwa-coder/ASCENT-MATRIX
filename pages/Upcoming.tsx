import React from 'react';
import { UPCOMING_EVENTS } from '../constants';
import { Calendar } from '../components/Icons';

const Upcoming = () => {
  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Future Summits</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">The journey doesn't end here. Mark your calendars for our specialized track events and workshops throughout 2026.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {UPCOMING_EVENTS.map((event) => (
                  <div key={event.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all group flex flex-col">
                      <div className="h-64 overflow-hidden relative">
                           <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                           <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-4 py-2 rounded-lg flex items-center gap-2 text-purple-400 font-bold">
                               <Calendar className="w-4 h-4" /> {event.date}
                           </div>
                      </div>
                      <div className="p-8 flex-1 flex flex-col">
                          <h2 className="text-2xl font-bold text-white mb-3">{event.title}</h2>
                          <p className="text-gray-400 mb-6 flex-1">{event.description}</p>
                          
                          <div className="mb-8">
                              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">What's Included</h4>
                              <ul className="space-y-2">
                                  {event.benefits.map((benefit, i) => (
                                      <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                                          <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span> {benefit}
                                      </li>
                                  ))}
                              </ul>
                          </div>
                          
                          <button className="w-full border border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white py-3 rounded-lg font-bold transition-all">
                              Notify Me when Registration Opens
                          </button>
                      </div>
                  </div>
              ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-500/20 rounded-2xl p-8 md:p-12 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Have an Early Bird Coupon?</h3>
              <p className="text-gray-400 mb-6">Use code <span className="text-white font-mono bg-white/10 px-2 py-1 rounded">EARLY50</span> to get 50% off on your next registration.</p>
          </div>
      </div>
    </div>
  );
};

export default Upcoming;
