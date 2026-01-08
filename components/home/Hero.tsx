
import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';

// Use namespace to resolve named export issues in the environment
const { Link } = ReactRouterDOM as any;

export const Hero = () => {
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200",
      title: "ASCENT MATRIX 2026",
      subtitle: "Amplify Innovation & IP Generation for India's Deep-Tech"
    },
    {
      image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&q=80&w=1200",
      title: "QUARTERLY UNIFIED CONNECT",
      subtitle: "Moving from the Idea of an Ecosystem to the Engine of a Nation"
    }
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative h-[700px] w-full overflow-hidden bg-black">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transform scale-105"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>
          
          <div className="relative h-full flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-8xl font-black text-white mb-6 drop-shadow-2xl tracking-tighter uppercase italic">
              {slide.title}
            </h1>
            <p className="text-xl md:text-3xl text-purple-300 mb-10 font-medium max-w-3xl mx-auto">
              {slide.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-10 py-5 rounded-full font-bold text-xl transition-transform hover:scale-105 shadow-[0_0_30px_rgba(192,38,211,0.4)]">
                Register for Summit
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
