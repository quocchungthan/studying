import React from 'react';
import { Code, Palette, Globe, Lightbulb, Users, Rocket, MessageSquare, Phone, MapPin, Clock, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';

function App() {
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
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Navigation */}
      <nav className="fixed w-full bg-[#2A2E3D]/95 backdrop-blur-sm z-50 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-[#00FF85] text-4xl font-bold">P</span>
          </div>
          <div className="flex items-center space-x-8">
            <a href="#home" className="text-white hover:text-[#00FF85] transition">HOME</a>
            <a href="#expertise" className="text-white hover:text-[#00FF85] transition">EXPERTISE</a>
            <a href="#portfolio" className="text-white hover:text-[#00FF85] transition">PORTFOLIO</a>
            <a href="#experience" className="text-white hover:text-[#00FF85] transition">EXPERIENCE</a>
            <a href="#contact" className="text-white hover:text-[#00FF85] transition">CONTACT</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div 
        id="home"
        className="min-h-screen relative flex items-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?auto=format&fit=crop&q=80&w=2071")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#2A2E3D]/80"></div>
        <div className="container mx-auto px-4 relative z-10">
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

      {/* Expertise Section */}
      <div id="expertise" className="py-20 bg-[#2A2E3D]">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-white text-center mb-4">01 WHY CHOOSE PRIMUS</h2>
          <p className="text-2xl text-white/90 text-center mb-16">OUR TECHNICAL EXPERTISE</p>
          <div className="max-w-3xl mx-auto space-y-8">
            {expertiseData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-white">
                  <span>{item.label}</span>
                  <span>{item.percentage}%</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#00FF85] rounded-full transition-all duration-1000"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio Section */}
      <div id="portfolio" className="py-20 bg-[#2A2E3D]">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-white text-center mb-4">02 PORTFOLIO</h2>
          <p className="text-2xl text-white/90 text-center mb-16">DISCOVER OUR LATEST PROJECTS</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((project) => (
              <div key={project} className="group relative overflow-hidden rounded-lg">
                <img 
                  src={`https://images.unsplash.com/photo-${project === 1 ? '1460925895917-afdab827c52f' : project === 2 ? '1551650975-87deedd944c3' : '1557838923-2985c318be48'}?auto=format&fit=crop&q=80&w=2015`}
                  alt={`Project ${project}`}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-[#2A2E3D]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">PROJECT {project.toString().padStart(2, '0')}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div id="experience" className="py-20 bg-[#2A2E3D]">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-white text-center mb-4">03 EXPERIENCE</h2>
          <div className="max-w-4xl mx-auto mt-16">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#00FF85]"></div>
              
              {/* Timeline items */}
              {experienceData.map((item, index) => (
                <div key={index} className={`relative mb-16 ${index % 2 === 0 ? 'text-right pr-8 ml-auto pl-8' : 'text-left pl-8 mr-auto pr-8'}`} style={{width: '45%'}}>
                  <div className="absolute top-0 w-4 h-4 rounded-full bg-[#00FF85]" style={{[index % 2 === 0 ? 'left' : 'right']: '-8px'}}></div>
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
      <div id="contact" className="py-20 bg-[#2A2E3D]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-8">CONNECT WITH US</h2>
          <p className="text-xl text-white/90 text-center mb-12 max-w-2xl mx-auto">
            Let's discuss how we can bring your ideas to life. Reach out to us, and we'll respond promptly.
          </p>
          <div className="max-w-xl mx-auto">
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="First name *"
                  className="bg-transparent border border-white/30 rounded p-3 text-white focus:outline-none focus:border-[#00FF85]"
                />
                <input
                  type="text"
                  placeholder="Last name *"
                  className="bg-transparent border border-white/30 rounded p-3 text-white focus:outline-none focus:border-[#00FF85]"
                />
              </div>
              <input
                type="email"
                placeholder="Email *"
                className="w-full bg-transparent border border-white/30 rounded p-3 text-white focus:outline-none focus:border-[#00FF85]"
              />
              <input
                type="tel"
                placeholder="Phone"
                className="w-full bg-transparent border border-white/30 rounded p-3 text-white focus:outline-none focus:border-[#00FF85]"
              />
              <textarea
                placeholder="Message"
                rows={6}
                className="w-full bg-transparent border border-white/30 rounded p-3 text-white focus:outline-none focus:border-[#00FF85]"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-[#00FF85] text-[#2A2E3D] font-bold py-3 rounded hover:bg-[#00FF85]/90 transition"
              >
                Send
              </button>
            </form>
            <div className="flex justify-center space-x-6 mt-12">
              <a href="#" className="text-white hover:text-[#00FF85] transition"><Linkedin size={24} /></a>
              <a href="#" className="text-white hover:text-[#00FF85] transition"><Twitter size={24} /></a>
              <a href="#" className="text-white hover:text-[#00FF85] transition"><Instagram size={24} /></a>
              <a href="#" className="text-white hover:text-[#00FF85] transition"><Facebook size={24} /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;