
import React from 'react';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';
import UnderConstruction from '../components/UnderConstruction';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#111111]">
      <Navbar />
      <UnderConstruction message="Contact page is coming soon!" />
      <Footer />
    </div>
  );
};

export default Contact;
