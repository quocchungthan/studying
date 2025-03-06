import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import logo from '../assets/primus-high-resolution-logo-transparent-cropped.svg'; // Import the logo SVG

export default function Home() {
  const expertiseData = [
    { label: 'WEB DEVELOPMENT', percentage: 95 },
    { label: 'UX/UI DESIGN', percentage: 90 },
    { label: 'GRAPHIC DESIGN', percentage: 85 },
    { label: 'E-COMMERCE SOLUTIONS', percentage: 85 },
    { label: 'DIGITAL MARKETING', percentage: 90 },
    { label: 'PROJECT MANAGEMENT', percentage: 80 },
  ];

  const experienceData = [
    {
      period: '2015-2017',
      title: 'PROJECT A',
      role: 'Lead Web Development Specialist',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      period: '2017-2019',
      title: 'PROJECT B',
      role: 'Lead UX/UI Designer',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      period: '2019-2021',
      title: 'PROJECT C',
      role: 'Technical Director',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      period: '2021-Present',
      title: 'PROJECT D',
      role: 'Specialist in E-commerce Solutions',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      period: '2021-Present',
      title: 'PROJECT E',
      role: 'Innovative Digital Marketing Campaigns',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      period: '2022-Future',
      title: 'PROJECT F',
      role: 'Cutting-edge Web Development Projects',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#2A2E3D] flex flex-col"
    >
      <Navigation />

      <main className="flex-grow">
        {/* Hero Section */}
        <div 
          id="home"
          className="min-h-screen relative flex items-center !pb-[200px]"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?auto=format&fit=crop&q=80&w=2071")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-[#2A2E3D]/80"></div>
          <div className="container relative z-10">
            <div className="max-w-4xl">
              <h1 className="text-8xl font-bold text-white mb-6">
                WELCOME
                <br />
                TO PRIMUS
              </h1>
              <p className="text-2xl text-white/90 mb-2">
                Empowering Your Business with
              </p>
              <p className="text-2xl text-white/90 mb-8">
                Exceptional Web Solutions
              </p>
            </div>
          </div>
        </div>

        {/* Introduction Section */}
        <div className="py-32 bg-[#2A2E3D] !mt-[-400px]">
          <div className="container">
            <div className="max-w-4xl mx-auto bg-[#1E2231] shadow-2xl p-16 relative min-h-[70vh] z-10 content-center">
              <div className="text-center">
                <div className="text-[#00FF85] text-6xl font-bold mb-8 items-center content-between justify-center">
                  <img src={logo} alt="Logo" style={{margin: 'auto'}} className="logo-image" />
                </div>
                <p className="text-white/90 text-xl mb-12">
                  At Primus, we are committed to delivering top-notch web development, user interface, and graphic design solutions. With expertise in various technical aspects, we ensure the success of every project we handle.
                </p>
                <button 
                  className="border border-[#00FF85] text-[#00FF85] px-12 py-4 hover:bg-[#00FF85] hover:text-[#2A2E3D] transition duration-300"
                >
                  VIEW OUR RESUME
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Expertise Section */}
        <div 
          id="expertise" 
          className="py-32 bg-[#2A2E3D] relative"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-[#2A2E3D]/90"></div>
          <div className="container relative z-10">
            <h2 className="text-5xl font-bold text-white/90 text-center mb-4">01 WHY CHOOSE PRIMUS</h2>
            <p className="text-2xl text-white/70 text-center mb-16">OUR TECHNICAL EXPERTISE</p>
            <div className="max-w-4xl mx-auto space-y-8">
              {expertiseData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-white">
                    <span>{item.label}</span>
                    <span>{item.percentage}%</span>
                  </div>
                  <div className="h-2 bg-white/20">
                    <div 
                      className="h-full bg-[#00FF85] transition-all duration-1000"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio Section */}
        <div id="portfolio" className="py-32 bg-[#2A2E3D]">
          <div className="container">
            <h2 className="text-5xl font-bold text-white/90 text-center mb-4">02 PORTFOLIO</h2>
            <p className="text-2xl text-white/70 text-center mb-16">DISCOVER OUR LATEST PROJECTS</p>
            <div className="grid md:grid-cols-3 gap-0">
              {[1, 2, 3].map((project) => (
                <Link 
                  key={project} 
                  to={`/project/${project}`}
                  className="group relative block"
                >
                  <img 
                    src={`https://images.unsplash.com/photo-${project === 1 ? '1460925895917-afdab827c52f' : project === 2 ? '1551650975-87deedd944c3' : '1557838923-2985c318be48'}?auto=format&fit=crop&q=80&w=2015`}
                    alt={`Project ${project}`}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-[#2A2E3D]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-bold">PROJECT {project.toString().padStart(2, '0')}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div 
          id="experience" 
          className="py-32 bg-[#2A2E3D] relative"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-[#2A2E3D]/90"></div>
          <div className="container relative z-10 !pb-[400px]">
            <h2 className="text-5xl font-bold text-white/90 text-center mb-4">03 EXPERIENCE</h2>
            <div className="max-w-4xl mx-auto mt-16">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-1/2 h-full w-0.5 bg-[#00FF85]"></div>
                
                {/* Timeline items */}
                {experienceData.map((item, index) => (
                  <div key={index} className={`relative mb-16 ${index % 2 === 0 ? 'text-right pr-8 ml-auto pl-8' : 'text-left pl-8 mr-auto pr-8'}`} style={{width: '45%'}}>
                    <div 
                      className="absolute w-3 h-3 bg-[#00FF85] rounded-full" 
                      style={{
                        [index % 2 === 0 ? 'left' : 'right']: [index % 2 === 0 ? '-44px' : '-58px'],
                        top: '0.5rem',
                        transform: 'translateX(-50%)'
                      }}
                    ></div>
                    <span className="text-[#00FF85] block mb-2">{item.period}</span>
                    <h3 className="text-white text-2xl font-bold mb-2">{item.title}</h3>
                    <h4 className="text-white/90 text-lg mb-2">{item.role}</h4>
                    <p className="text-white/70">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="py-32 bg-[#2A2E3D] !mt-[-500px]">
          <div className="container">
            <div className="max-w-4xl mx-auto bg-[#1E2231] shadow-2xl p-16 relative z-40">
              <div className='grid grid-cols-2 gap-16'>
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-white/90 mb-4">CONNECT WITH US</h2>
                  <p className="text-xl text-white/70">
                    Let's discuss how we can bring your ideas to life. Reach out to us, and we'll respond promptly.
                  </p>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-white/90 text-sm">First name *</label>
                      <input
                        type="text"
                        className="w-full bg-transparent border border-white/30 p-3 text-white focus:outline-none focus:border-[#00FF85]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-white/90 text-sm">Last name *</label>
                      <input
                        type="text"
                        className="w-full bg-transparent border border-white/30 p-3 text-white focus:outline-none focus:border-[#00FF85]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-white/90 text-sm">Email *</label>
                    <input
                      type="email"
                      className="w-full bg-transparent border border-white/30 p-3 text-white focus:outline-none focus:border-[#00FF85]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-white/90 text-sm">Phone</label>
                    <input
                      type="tel"
                      className="w-full bg-transparent border border-white/30 p-3 text-white focus:outline-none focus:border-[#00FF85]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-white/90 text-sm">Message</label>
                    <textarea
                      rows={6}
                      className="w-full bg-transparent border border-white/30 p-3 text-white focus:outline-none focus:border-[#00FF85]"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#00FF85] text-[#2A2E3D] font-bold py-4 hover:bg-[#00FF85]/90 transition"
                  >
                    Send
                  </button>
                </form>
              </div>
              <div className="flex justify-center space-x-6 mt-12">
                <a href="#" className="text-white/90 hover:text-[#00FF85] transition"><Linkedin size={24} /></a>
                <a href="#" className="text-white/90 hover:text-[#00FF85] transition"><Twitter size={24} /></a>
                <a href="#" className="text-white/90 hover:text-[#00FF85] transition"><Instagram size={24} /></a>
                <a href="#" className="text-white/90 hover:text-[#00FF85] transition"><Facebook size={24} /></a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
}