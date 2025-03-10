import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Maximize2, Globe, Github } from 'lucide-react'; // Added Globe and GitHub icons
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ImageLightbox from '../components/ImageLightbox';

import content from '../assets/content.json';

// Create a standardized project array from content.json
const projectArray = content.projects.map((project, index) => ({
  id: index + 1,
  title: project.name,
  description: project.description,
  images: project.images,
  links: project.links, // Include the links property
}));

export default function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Find the project with the given ID
  const project = projectArray.find((x) => x.id.toString() === id);

  // Determine the total number of projects
  const totalProjects = projectArray.length;

  // If project not found, redirect to home
  useEffect(() => {
    if (!project) {
      navigate('/');
    }
  }, [project, navigate]);

  if (!project) {
    return null; // Return null while redirecting
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='min-h-screen bg-[#2A2E3D] flex flex-col'
    >
      <Navigation />

      <main className='flex-grow'>
        <div className='pt-24 pb-12 md:pb-20'>
          <div className='container px-4 sm:px-6 md:px-8'>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className='text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 md:mb-8'
            >
              {project.title}
            </motion.h1>

            {/* Project buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25 }}
              className='flex flex-wrap gap-4 mb-8'
            >
              {project.links?.website && (
                <a
                  href={project.links.website}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center bg-[#0aee74] text-[#000] px-6 py-3 rounded-md hover:bg-[#00FF85] transition-colors duration-300 font-medium'
                >
                  <Globe size={20} className='mr-3' />
                  Visit Website
                </a>
              )}
              {project.links?.source && (
                <a
                  href={project.links.source}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center border border-[#00FF85] text-[#00FF85] px-6 py-3 rounded-md hover:bg-[#00FF85]/10 transition-colors duration-300 font-medium'
                >
                  <Github size={20} className='mr-3' />
                  View Source
                </a>
              )}
            </motion.div>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className='text-white/70 text-base sm:text-lg md:text-xl mb-8 md:mb-12 max-w-3xl'
            >
              {project.description}
            </motion.p>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12'>
              {project.images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className={`${
                    index === 0 ? 'md:col-span-2' : ''
                  } relative group overflow-hidden rounded-lg cursor-pointer`}
                  onClick={() => {
                    setCurrentImageIndex(index);
                    setLightboxOpen(true);
                  }}
                >
                  <img
                    src={image}
                    alt={`Project ${id} - Image ${index + 1}`}
                    className='w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105'
                  />
                  <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                    <Maximize2 className='text-white' size={24} />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className='flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0'
            >
              <Link
                to={`/project/${Number(id) - 1}`}
                className={`text-white hover:text-[#00FF85] transition text-sm sm:text-base ${
                  Number(id) <= 1 ? 'invisible' : ''
                }`}
              >
                ← Previous Project
              </Link>
              <Link
                to='/'
                className='text-[#00FF85] hover:text-white transition text-sm sm:text-base'
              >
                Back to Home
              </Link>
              <Link
                to={`/project/${Number(id) + 1}`}
                className={`text-white hover:text-[#00FF85] transition text-sm sm:text-base ${
                  Number(id) >= totalProjects ? 'invisible' : ''
                }`}
              >
                Next Project →
              </Link>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />

      {lightboxOpen && (
        <ImageLightbox
          images={project.images}
          currentIndex={currentImageIndex}
          onClose={() => setLightboxOpen(false)}
          onPrevious={() =>
            setCurrentImageIndex((prev) => Math.max(0, prev - 1))
          }
          onNext={() =>
            setCurrentImageIndex((prev) =>
              Math.min(project.images.length - 1, prev + 1)
            )
          }
        />
      )}
    </motion.div>
  );
}
