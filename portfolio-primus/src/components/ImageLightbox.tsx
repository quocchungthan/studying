import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export default function ImageLightbox({ images, currentIndex, onClose, onPrevious, onNext }: ImageLightboxProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-[#00FF85] transition"
        >
          <X size={32} />
        </button>

        <button
          onClick={onPrevious}
          className={`absolute left-4 text-white hover:text-[#00FF85] transition ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={currentIndex === 0}
        >
          <ChevronLeft size={48} />
        </button>

        <button
          onClick={onNext}
          className={`absolute right-4 text-white hover:text-[#00FF85] transition ${currentIndex === images.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={currentIndex === images.length - 1}
        >
          <ChevronRight size={48} />
        </button>

        <motion.img
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="max-h-[90vh] max-w-[90vw] object-contain"
        />
      </motion.div>
    </AnimatePresence>
  );
}