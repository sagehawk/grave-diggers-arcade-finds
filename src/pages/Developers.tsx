
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Upload, Eye, BarChart3, Download, Users, Globe, CheckCircle, ArrowRight } from 'lucide-react';

const benefits = [
  {
    icon: <Eye size={24} />,
    title: 'Get Discovered',
    description: 'Put your game in front of thousands of players actively looking for new indie experiences.',
  },
  {
    icon: <Download size={24} />,
    title: 'Direct Downloads',
    description: 'Add multiple download links for every platform your game supports — no middleman.',
  },
  {
    icon: <BarChart3 size={24} />,
    title: 'Track Engagement',
    description: 'See how many views, likes, and comments your game receives from the community.',
  },
  {
    icon: <Users size={24} />,
    title: 'Community Feedback',
    description: 'Get direct feedback from players who are passionate about indie games.',
  },
  {
    icon: <Globe size={24} />,
    title: 'Cross-Platform',
    description: 'Support Windows, Mac, Linux, mobile, console, and browser-based games.',
  },
  {
    icon: <Upload size={24} />,
    title: 'Easy Submission',
    description: 'Upload screenshots, trailers, and details in minutes with our streamlined form.',
  },
];

const steps = [
  { step: '01', title: 'Create an Account', description: 'Sign up for free to get started.' },
  { step: '02', title: 'Submit Your Game', description: 'Fill in details, upload media, and add download links.' },
  { step: '03', title: 'Get Reviewed', description: 'Our team reviews your submission for quality.' },
  { step: '04', title: 'Go Live', description: 'Your game appears on the community page for all to discover.' },
];

const Developers: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#111111]">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-ggrave-red/20 text-ggrave-red text-xs font-bold uppercase tracking-wider rounded-full mb-4">
            For Developers
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-pixel">
            Share Your Game<br />With the World
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            GamerGrave gives indie developers a free platform to showcase their games,
            reach new players, and build a community around their creations.
          </p>
          <div className="mt-8">
            <Link
              to="/submit-game"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-ggrave-red text-white font-semibold rounded-lg hover:bg-red-700 transition-all hover:scale-105 shadow-lg shadow-ggrave-red/25"
            >
              <Upload size={18} />
              Submit Your Game
            </Link>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Why List on GamerGrave?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-ggrave-red/30 transition-all duration-300 group"
              >
                <div className="p-2.5 bg-gray-800 rounded-lg w-fit mb-4 group-hover:bg-ggrave-red/10 transition-colors">
                  <div className="text-gray-400 group-hover:text-ggrave-red transition-colors">{benefit.icon}</div>
                </div>
                <h3 className="text-white font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s, i) => (
              <div key={i} className="relative">
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 h-full">
                  <span className="text-3xl font-black text-ggrave-red/30 block mb-2">{s.step}</span>
                  <h3 className="text-white font-semibold mb-1.5">{s.title}</h3>
                  <p className="text-gray-400 text-sm">{s.description}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight size={18} className="text-gray-700" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submission Checklist */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 md:p-10 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Submission Checklist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'Game title and description',
              'Thumbnail image (16:9 recommended)',
              'At least one screenshot or gallery image',
              'Current development status',
              'Supported platforms',
              'Price or "Free"',
              'Download links for each platform',
              'Trailer video URL (optional)',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-300">
                <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Share Your Game?</h2>
          <p className="text-gray-400 mb-6">
            Join hundreds of indie developers who've already listed their games on GamerGrave.
          </p>
          <Link
            to="/submit-game"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-ggrave-red text-white font-semibold rounded-lg hover:bg-red-700 transition-all"
          >
            Get Started
            <ArrowRight size={18} />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Developers;
