import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import logo from '../assets/primus-high-resolution-logo-transparent-cropped.svg'; // Import the logo SVG
import ContactForm from '../components/ContactForm';
import content from '../assets/content.json';

export default function Home() {
  const expertiseData = content.expertise.map((x: { name: string; level: string }) => ({ label: x.name, percentage: x.level }));
  const experienceData =  content.experience.map((x: { period: string; name: string; subtitle: string; description: string }) => ({ period: x.period, title: x.name, description: x.description, role: x.subtitle.replace('## ', '') }));
  const portfolioData = content.projects.map((x: { name: string; description: string; images: string[] }, i: number) => ({ id: i + 1, thumb: x.images[0], description: x.description, images: x.images, name: x.name }));

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
          className="min-h-screen relative flex items-center !pb-[100px] md:!pb-[200px]"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?auto=format&fit=crop&q=80&w=2071")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[#2A2E3D]/80"></div>
          <div className="container relative z-10 px-4 sm:px-6 md:px-8">
            <div className="max-w-4xl">
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white mb-6">
                We<span style={{ color: "#00f146" }}>'</span>re
                <br />
                Primus
              </h1>
              <p className="text-xl md:text-2xl text-white/70 mb-2">
                {content.translation.SLOGAN_LINE_1}
              </p>
              <p className="text-xl md:text-2xl text-white/70 mb-8">
                {content.translation.SLOGAN_LINE_2}
              </p>
            </div>
          </div>
        </div>

        {/* Introduction Section */}
        <div className="py-16 md:py-32 bg-[#2A2E3D] !mt-[-200px] md:!mt-[-400px]">
          <div className="container px-4 sm:px-6 md:px-8">
            <div className="max-w-4xl mx-auto bg-[#1E2231] shadow-2xl p-6 sm:p-10 md:p-16 relative min-h-[50vh] md:min-h-[70vh] z-10 content-center">
              <div className="text-center">
                <div className="text-[#00FF85] text-4xl md:text-6xl font-bold mb-6 md:mb-8 items-center content-between justify-center">
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ margin: "auto" }}
                    className="logo-image"
                  />
                </div>
                <p className="text-white/70 text-lg md:text-xl mb-8 md:mb-12">
                  {content.translation.INTRODUCTION_CONTENT}
                </p>
                <button className="border border-[#00FF85] text-[#00FF85] px-6 py-3 md:px-12 md:py-4 hover:bg-[#00FF85] hover:text-[#2A2E3D] transition duration-300">
                  VIEW OUR RESUME
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Expertise Section */}
        <div
          id="expertise"
          className="py-16 md:py-32 bg-[#2A2E3D] relative"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-[#2A2E3D]/90"></div>
          <div className="container relative z-10 px-4 sm:px-6 md:px-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white/70 text-center mb-4">
              <span className="tracking-widest">01 WHY CHOOSE PRIMUS</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/70 text-center mb-10 md:mb-16 tracking-widest">
              OUR TECHNICAL EXPERTISE
            </p>
            <div className="max-w-3xl mx-auto space-y-6 md:space-y-8">
              {expertiseData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-white">
                    <span className="text-sm sm:text-base">{item.label}</span>
                    <span className="text-sm sm:text-base">
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="h-2">
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
        <div id="portfolio" className="py-16 md:py-32 bg-[#2A2E3D]">
          <div className="container px-4 sm:px-6 md:px-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white/70 text-center mb-4 tracking-widest">
              02 PORTFOLIO
            </h2>
            <p className="text-xl md:text-2xl text-white/70 text-center mb-10 md:mb-16 tracking-widest">
              DISCOVER OUR LATEST PROJECTS
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-0">
              {
                portfolioData.map((projectData) => {
                    return <Link
                      key={projectData.id}
                      to={`/project/${projectData.id}`}
                      className="group relative block"
                    >
                      <img
                        src={projectData.thumb}
                        alt={projectData.name}
                        className="w-full h-64 object-cover" />
                      <div className="absolute inset-0 bg-[#2A2E3D]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <h3 className="text-white text-2xl font-bold">{projectData.name}</h3>
                      </div>
                    </Link>;
                  })
              }
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div
          id="experience"
          className="py-16 md:py-32 bg-[#2A2E3D] relative"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&q=80")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-[#2A2E3D]/90"></div>
          <div className="container relative z-10 px-4 sm:px-6 md:px-8 !pb-[200px] md:!pb-[400px]">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white/70 text-center mb-4 tracking-widest">
              03 EXPERIENCE
            </h2>
            <div className="max-w-4xl mx-auto mt-10 md:mt-16">
              {/* Mobile timeline (stacked) */}
              <div className="md:hidden space-y-8">
                {experienceData.map((item, index) => (
                  <div
                    key={index}
                    className="relative border-l-2 border-[#00FF85] pl-6 pb-8"
                  >
                    <div className="absolute left-[-5px] top-0 w-2 h-2 bg-[#00FF85] rounded-full"></div>
                    <span className="text-[#00FF85] block mb-2">
                      {item.period}
                    </span>
                    <h3 className="text-white text-xl font-bold mb-2">
                      {item.title}
                    </h3>
                    <h4 className="text-white/70 text-lg mb-2">{item.role}</h4>
                    <p className="text-white/70 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>

              {/* Desktop timeline */}
              <div className="hidden md:block relative">
                {/* Timeline line */}
                <div className="absolute left-1/2 h-full w-0.5 bg-[#00FF85]"></div>

                {/* Timeline items */}
                {experienceData.map((item, index) => (
                  <div
                    key={index}
                    className={`relative mb-16 ${
                      index % 2 === 0
                        ? "text-right pr-8 ml-auto pl-8"
                        : "text-left pl-8 mr-auto pr-8"
                    }`}
                    style={{ width: "45%" }}
                  >
                    <div
                      className="absolute w-3 h-3 bg-[#00FF85] rounded-full"
                      style={{
                        [index % 2 === 0 ? "left" : "right"]: [
                          index % 2 === 0 ? "-44px" : "-58px",
                        ],
                        top: "0.5rem",
                        transform: "translateX(-50%)",
                      }}
                    ></div>
                    <span className="text-[#00FF85] block mb-2">
                      {item.period}
                    </span>
                    <h3 className="text-white text-2xl font-bold mb-2">
                      {item.title}
                    </h3>
                    <h4 className="text-white/70 text-lg mb-2">{item.role}</h4>
                    <p className="text-white/70">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div
          id="contact"
          className="py-16 md:py-32 bg-[#2A2E3D] !mt-[-200px] md:!mt-[-500px]"
        >
          <div className="container px-4 sm:px-6 md:px-8">
            <div className="max-w-4xl mx-auto bg-[#1E2231] shadow-2xl p-6 sm:p-10 md:p-16 relative z-40 min-h-[50vh] md:min-h-[70vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                <div className="text-center md:text-left mb-8 md:mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-white/70 mb-4">
                    CONNECT WITH US
                  </h2>
                  <p className="text-lg md:text-xl text-white/70">
                    {content.translation.CONNECT_WITH_US_CONTENT}
                  </p>
                </div>
                <ContactForm></ContactForm>
              </div>
              <div className="flex justify-center space-x-6 mt-8 md:mt-12">
                <a
                  href={content.translation.EXTERNAL_LINKS.LINKED_IN}
                  target='_blank'
                  className="text-white/70 hover:text-[#00FF85] transition"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href={content.translation.EXTERNAL_LINKS.X}
                  target='_blank'
                  className="text-white/70 hover:text-[#00FF85] transition"
                >
                  <Twitter size={24} />
                </a>
                <a
                  href={content.translation.EXTERNAL_LINKS.INSTAGRAM}
                  target='_blank'
                  className="text-white/70 hover:text-[#00FF85] transition"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href={content.translation.EXTERNAL_LINKS.FACEBOOK}
                  target='_blank'
                  className="text-white/70 hover:text-[#00FF85] transition"
                >
                  <Facebook size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
}
