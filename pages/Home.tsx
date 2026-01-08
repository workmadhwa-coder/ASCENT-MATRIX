
import React from 'react';
import { Hero } from '../components/home/Hero';
import { About } from '../components/home/About';
import { Pillars } from '../components/home/Pillars';
import { Outcomes } from '../components/home/Outcomes';
import { VenueHome } from '../components/home/VenueHome';
import { Summit } from '../components/home/Summit';
import { Portfolio } from '../components/home/Portfolio';
import { Committees } from '../components/home/Committees';
import { Partners } from '../components/home/Partners';
import { CTA } from '../components/home/CTA';

const Home = () => {
  return (
    <div className="bg-black text-white scroll-smooth">
      <div id="hero"><Hero /></div>
      <div id="about"><About /></div>
      <div id="pillars"><Pillars /></div>
      <div id="outcomes"><Outcomes /></div>
      <div id="summit"><Summit /></div>
      <div id="venue-preview"><VenueHome /></div>
      <div id="portfolio"><Portfolio /></div>
      <div id="committees"><Committees /></div>
      <div id="partners"><Partners /></div>
      <div id="cta"><CTA /></div>
    </div>
  );
};

export default Home;
