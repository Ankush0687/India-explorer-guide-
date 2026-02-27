import { useState, useEffect } from "react";
import { heroImages } from "@/data/tourismData";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollToContent = () => {
    document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <img
            src={heroImages[current]}
            alt="India tourism"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="hero-overlay absolute inset-0 z-10" />

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-4 font-body text-sm uppercase tracking-[0.3em] text-primary-foreground/80 md:text-base"
        >
          Discover the magic of
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-display text-5xl font-bold text-primary-foreground md:text-7xl lg:text-8xl"
        >
          Incredible India
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-4 max-w-xl font-body text-lg text-primary-foreground/70 md:text-xl"
        >
          Explore ancient temples, pristine beaches, majestic mountains, and timeless heritage
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          onClick={scrollToContent}
          className="mt-12 flex flex-col items-center gap-2 text-primary-foreground/60 transition-colors hover:text-primary-foreground"
        >
          <span className="text-sm uppercase tracking-widest">Explore</span>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </motion.button>
      </div>

      {/* Slideshow dots */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current
                ? "w-8 bg-primary-foreground"
                : "w-2 bg-primary-foreground/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
