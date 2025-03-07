import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const ExperienceSection = ({ experienceData }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true); // Section is in view
        }
      },
      { threshold: 0.1 } // Trigger when 50% of the section is in view
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Find corresponding project ID for a given experience item
  const findProjectId = (experienceItem) => {
    // This is a simplified mapping based on name similarity
    // You may need to adjust this logic based on your data structure
    const projectNameMapping = {
      CollabSync: 1,
      FinGuard: 2,
      MediSync: 3,
      BizFlow: 4,
      CareTrack: 5,
      NexusCart: 6,
    };

    return projectNameMapping[experienceItem.title] || null;
  };

  const handleExperienceClick = (item) => {
    const projectId = findProjectId(item);
    if (projectId) {
      navigate(`/project/${projectId}`);
    }
  };

  return (
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
      ref={sectionRef}
    >
      <div className="absolute inset-0 bg-[#2A2E3D]/90"></div>
      <div className="container relative z-10 px-4 sm:px-6 md:px-8 !pb-[200px] md:!pb-[400px]">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white/70 text-center mb-4 tracking-widest">
          03 EXPERIENCE
        </h2>
        <div className="max-w-4xl mx-auto mt-10 md:mt-16">
          {/* Mobile timeline (stacked) */}
          <div className="md:hidden space-y-8">
            {experienceData.map((item, index) => {
              const projectId = findProjectId(item);
              const isClickable = projectId !== null;

              return (
                <div
                  key={index}
                  className={`relative border-l-2 border-[#00FF85] pl-6 pb-8 ${
                    isClickable
                      ? "cursor-pointer transition-all duration-300"
                      : ""
                  } ${
                    hoveredItem === index && isClickable
                      ? "bg-[#1E2231]/70 p-4 -ml-4 rounded-r-lg"
                      : ""
                  }`}
                  onMouseEnter={() => isClickable && setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => isClickable && handleExperienceClick(item)}
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
                  {isClickable && hoveredItem === index && (
                    <div className="mt-3 text-[#00FF85] text-sm">
                      Click to view project details →
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop timeline */}
          <div className="hidden md:block relative">
            {/* Timeline line */}
            <div
              className={`absolute left-1/2 h-full w-0.5 bg-[#00FF85] transition-all duration-1000 opacity-0 ${
                isVisible ? "fade-in" : ""
              }`}
            ></div>

            {/* Timeline items */}
            {experienceData.map((item, index) => {
              const projectId = findProjectId(item);
              const isClickable = projectId !== null;
              const isLeft = index % 2 !== 0;

              return (
                <div
                  key={index}
                  className={`relative mb-16 ${
                    isLeft
                      ? "text-left pl-8 mr-auto pr-8"
                      : "text-right pr-8 ml-auto pl-8"
                  } ${
                    isClickable ? "cursor-pointer" : ""
                  } transition-all duration-300 ${
                    hoveredItem === index && isClickable
                      ? "bg-[#1E2231]/70 p-4 rounded-lg"
                      : ""
                  }`}
                  style={{ width: "45%" }}
                  onMouseEnter={() => isClickable && setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => isClickable && handleExperienceClick(item)}
                >
                  <div
                    className={`absolute w-3 h-3 bg-[#00FF85] rounded-full transition-all duration-1000 opacity-0 ${
                      isVisible ? "fade-in" : ""
                    }`}
                    style={{
                      [isLeft ? "right" : "left"]: [isLeft ? "-58px" : "-44px"],
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
                  {isClickable && hoveredItem === index && (
                    <div
                      className={`mt-3 text-[#00FF85] text-sm ${
                        isLeft ? "" : "text-right"
                      }`}
                    >
                      Click to view project details →
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;
