
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Gamepad2, Users, Upload, Search, Shield, Zap, Code, Heart } from 'lucide-react';

const features = [
  {
    icon: <Search size={24} />,
    title: 'Discover Games',
    description: 'Browse thousands of indie games with smart filters, search, and curated recommendations.',
  },
  {
    icon: <Upload size={24} />,
    title: 'Submit Your Game',
    description: 'Developers can upload their games with screenshots, trailers, and download links.',
  },
  {
    icon: <Users size={24} />,
    title: 'Community Driven',
    description: 'A thriving community of gamers and developers discovering the next indie hit together.',
  },
  {
    icon: <Shield size={24} />,
    title: 'Quality Curated',
    description: 'Every submission is reviewed to maintain a high-quality, safe experience for all users.',
  },
  {
    icon: <Zap size={24} />,
    title: 'Lightning Fast',
    description: 'Optimized performance with modern tech stack for a seamless browsing experience.',
  },
  {
    icon: <Heart size={24} />,
    title: 'Free to Use',
    description: 'Completely free for gamers and affordable for developers who want to showcase their work.',
  },
];

const techStack = [
  { name: 'React', color: 'bg-cyan-500/20 text-cyan-400' },
  { name: 'TypeScript', color: 'bg-blue-500/20 text-blue-400' },
  { name: 'Vite', color: 'bg-purple-500/20 text-purple-400' },
  { name: 'Tailwind CSS', color: 'bg-teal-500/20 text-teal-400' },
  { name: 'Supabase', color: 'bg-green-500/20 text-green-400' },
  { name: 'PostgreSQL', color: 'bg-indigo-500/20 text-indigo-400' },
  { name: 'AWS', color: 'bg-orange-500/20 text-orange-400' },
  { name: 'Docker', color: 'bg-sky-500/20 text-sky-400' },
];

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#111111]">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-ggrave-red/20 rounded-2xl">
              <Gamepad2 size={48} className="text-ggrave-red" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-pixel">
            About GamerGrave
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            GamerGrave is a modern platform for indie game enthusiasts to discover, explore,
            and share hidden gems from the world of indie gaming. Built by gamers, for gamers.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 md:p-12 mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            We believe every indie game deserves a chance to be discovered. Our mission is to create
            a centralized platform where indie developers can showcase their creations and gamers can
            find their next favorite game. By bridging the gap between creators and players, we're
            building a community that celebrates creativity, innovation, and the passion behind
            indie game development.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all duration-300 hover:-translate-y-0.5 group"
              >
                <div className="p-2.5 bg-ggrave-red/10 rounded-lg w-fit mb-4 group-hover:bg-ggrave-red/20 transition-colors">
                  <div className="text-ggrave-red">{feature.icon}</div>
                </div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">Built With</h2>
          <p className="text-gray-500 text-center mb-6">
            Powered by modern, enterprise-grade technologies
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, i) => (
              <span
                key={i}
                className={`px-4 py-2 rounded-full text-sm font-medium ${tech.color}`}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-ggrave-red/10 via-ggrave-red/5 to-ggrave-red/10 border border-ggrave-red/20 rounded-2xl p-10">
          <Code size={32} className="mx-auto text-ggrave-red mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">Join Our Community</h2>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Whether you're a developer looking to share your game or a gamer seeking your next adventure,
            GamerGrave has something for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/community-games"
              className="px-6 py-3 bg-ggrave-red text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              Browse Games
            </Link>
            <Link
              to="/submit-game"
              className="px-6 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 border border-gray-700 transition-colors"
            >
              Submit Your Game
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
