import React, { useState, useEffect, useRef } from 'react';

const ExpertiseSection = ({ expertiseData }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true); // Section is in view
        }
      },
      { threshold: 0.4 } // Trigger when 50% of the section is in view
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

  return (
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
      ref={sectionRef}
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
              <div className={`h-2 ${
                    isVisible ? "animate-grow" : ""
                  }`}>
                <div
                  className={`h-full bg-[#00FF85] transition-all duration-1000`}
                  style={{ width: `${isVisible ? item.percentage : 0}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpertiseSection;
