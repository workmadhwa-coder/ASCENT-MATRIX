
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

// Use namespace to resolve named export issues in the environment
const { Link } = ReactRouterDOM as any;

export const CTA = () => {
  return (
    <section className="py-32 px-4 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-fixed relative">
      <div className="absolute inset-0 bg-purple-900/90 mix-blend-multiply"></div>
      <div className="relative max-w-4xl mx-auto text-center">
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 uppercase tracking-tighter italic">Ready to Shape the Nation?</h2>
        <p className="text-xl text-purple-100 mb-10 font-medium">Commit to the Quarterly Unified Connect. Amplify India's Innovation.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link to="/register" className="bg-white text-purple-900 hover:bg-gray-100 px-12 py-5 rounded-full font-black text-2xl shadow-2xl transition-transform hover:scale-105">
            JOIN THE MATRIX
          </Link>
        </div>
      </div>
    </section>
  );
};
