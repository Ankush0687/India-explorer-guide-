import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex: number;
  placeName: string;
}

const ImageGallery = ({ images, isOpen, onClose, initialIndex, placeName }: ImageGalleryProps) => {
  const [current, setCurrent] = useState(initialIndex);

  useEffect(() => {
    setCurrent(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % images.length);
      if (e.key === "ArrowLeft") setCurrent((c) => (c - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, images.length, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/90 p-4"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-background/20 p-2 text-primary-foreground transition-colors hover:bg-background/40"
        >
          <X className="h-6 w-6" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrent((c) => (c - 1 + images.length) % images.length);
          }}
          className="absolute left-4 rounded-full bg-background/20 p-2 text-primary-foreground transition-colors hover:bg-background/40"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <motion.img
          key={current}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          src={images[current]}
          alt={`${placeName} ${current + 1}`}
          className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain"
          onClick={(e) => e.stopPropagation()}
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrent((c) => (c + 1) % images.length);
          }}
          className="absolute right-4 rounded-full bg-background/20 p-2 text-primary-foreground transition-colors hover:bg-background/40"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <div className="absolute bottom-6 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setCurrent(i);
              }}
              className={`h-2 rounded-full transition-all ${
                i === current ? "w-6 bg-primary-foreground" : "w-2 bg-primary-foreground/40"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageGallery;
