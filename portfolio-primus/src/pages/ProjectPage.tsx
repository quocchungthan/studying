import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ImageLightbox from '../components/ImageLightbox';

const projectData = {
  '1': {
    title: 'PROJECT 01',
    description: 'An innovative web application that revolutionizes user experience through cutting-edge design and seamless functionality. Built with modern technologies and best practices in mind.',
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=2015',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2015',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=2015'
    ]
  },
  '2': {
    title: 'PROJECT 02',
    description: 'A comprehensive digital platform that combines elegant design with powerful functionality. This project showcases our ability to create solutions that are both beautiful and effective.',
    images: [
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=2015',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2015',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=2015'
    ]
  },
  '3': {
    title: 'PROJECT 03',
    description: 'A state-of-the-art mobile application that demonstrates our expertise in creating responsive, user-friendly interfaces that deliver exceptional results.',
    images: [
      'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=2015',
      'https://images.unsplash.com/photo-1481487196290-c152efe083f5?auto=format&fit=crop&q=80&w=2015',
      'https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&q=80&w=2015'
    ]
  }
};

export default function ProjectPage() {
  const { id } = useParams();
  const project = projectData[id as keyof typeof projectData];
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) {
    return <div>Project not found</div>;
  }

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
        <div className="pt-24 pb-20">
          <div className="container">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-6xl font-bold text-white mb-8"
            >
              {project.title}
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/90 text-xl mb-12 max-w-3xl"
            >
              {project.description}
            </motion.p>

            <div className="grid grid-cols-2 gap-8 mb-12">
              {project.images.map((image, index) => (
                <motion.div 
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className={`${index === 0 ? 'col-span-2' : ''} relative group overflow-hidden rounded-lg cursor-pointer`}
                  onClick={() => {
                    setCurrentImageIndex(index);
                    setLightboxOpen(true);
                  }}
                >
                  <img 
                    src={image} 
                    alt={`Project ${id} - Image ${index + 1}`} 
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Maximize2 className="text-white" size={32} />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex justify-between items-center"
            >
              <Link 
                to={`/project/${Number(id) - 1}`}
                className={`text-white hover:text-[#00FF85] transition ${Number(id) <= 1 ? 'invisible' : ''}`}
              >
                ← Previous Project
              </Link>
              <Link 
                to="/"
                className="text-[#00FF85] hover:text-white transition"
              >
                Back to Home
              </Link>
              <Link 
                to={`/project/${Number(id) + 1}`}
                className={`text-white hover:text-[#00FF85] transition ${Number(id) >= 3 ? 'invisible' : ''}`}
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
          onPrevious={() => setCurrentImageIndex(prev => Math.max(0, prev - 1))}
          onNext={() => setCurrentImageIndex(prev => Math.min(project.images.length - 1, prev + 1))}
        />
      )}
    </motion.div>
  );
}