import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Instagram, Facebook } from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import logo from "../assets/primus-high-resolution-logo-transparent-cropped.svg";
import ContactForm from "../components/ContactForm";
import content from "../assets/content.json";
import ExpertiseSection from "../components/ExpertiseSection";
import ExperienceSection from "../components/ExperienceSection";

export default function Home() {
  const expertiseData = content.expertise.map(
    (x: { name: string; level: string }) => ({
      label: x.name,
      percentage: x.level,
    })
  );

  // Transform experience data for the ExperienceSection
  const experienceData = content.experience
    .map(
      (x: {
        period: string;
        name: string;
        subtitle: string;
        description: string;
      }) => ({
        period: x.period,
        title: x.name,
        description: x.description,
        role: x.subtitle.replace("## ", ""),
      })
    )
    .sort((x, y) => (x.period < y.period ? 1 : -1));

  // Create portfolio data for the grid display
  const portfolioData = content.projects.map((project, index) => ({
    id: index + 1,
    thumb: project.images[0],
    description: project.description,
    images: project.images,
    name: project.name,
  }));

  const handleClick = () => {
    const url = content.translation.EXTERNAL_LINKS.TEAM_RESUME;
    window.open(url, "_blank");
  };

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
                <button
                  onClick={handleClick}
                  className="border border-[#00FF85] text-[#00FF85] px-6 py-3 md:px-12 md:py-4 hover:bg-[#00FF85] hover:text-[#2A2E3D] transition duration-300"
                >
                  VIEW OUR RESUME
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Expertise Section */}
        <ExpertiseSection expertiseData={expertiseData}></ExpertiseSection>

        {/* Portfolio Section */}
        <div id="portfolio" className="py-16 md:py-32 bg-[#2A2E3D]">
          <div className="container px-4 sm:px-6 md:px-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white/70 text-center mb-4 tracking-widest">
              02 PORTFOLIO
            </h2>
            <p className="text-xl md:text-2xl text-white/70 text-center mb-10 md:mb-16 tracking-widest">
              DISCOVER OUR LATEST PROJECTS
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {portfolioData.map((projectData) => (
                <Link
                  key={projectData.id}
                  to={`/project/${projectData.id}`}
                  className="group relative block overflow-hidden rounded-lg"
                >
                  <img
                    src={projectData.thumb}
                    alt={projectData.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#2A2E3D]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                    <h3 className="text-white text-2xl font-bold mb-2">
                      {projectData.name}
                    </h3>
                    <p className="text-white/80 text-sm text-center">
                      {projectData.description.substring(0, 100)}...
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <ExperienceSection experienceData={experienceData}></ExperienceSection>

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
                  target="_blank"
                  className="text-white/70 hover:text-[#00FF85] transition"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href={content.translation.EXTERNAL_LINKS.X}
                  target="_blank"
                  className="text-white/70 hover:text-[#00FF85] transition"
                >
                  <Twitter size={24} />
                </a>
                <a
                  href={content.translation.EXTERNAL_LINKS.INSTAGRAM}
                  target="_blank"
                  className="text-white/70 hover:text-[#00FF85] transition"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href={content.translation.EXTERNAL_LINKS.FACEBOOK}
                  target="_blank"
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
