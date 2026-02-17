import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onCtaClick: () => void;
}

const HeroSection = ({ onCtaClick }: HeroSectionProps) => {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.video
          alt="Technische Blueprints mit Bewegung"
          src="https://c.animaapp.com/mlqcq0lzeGbSwA/img/ai_1.mp4"
          poster="https://c.animaapp.com/mlqcq0lzeGbSwA/img/ai_1-poster.png"
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70" />
      </div>

      <div className="relative z-10 container mx-auto px-8 lg:px-16 text-center">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 text-white leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Ingenierbüro Joos GmbH
        </motion.h1>
        
        <motion.p
          className="text-lg md:text-xl lg:text-2xl mb-12 text-white max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Ihr Partner für professionelle Heizungs-, Lüftungs- und Sanitärplanung.
          Technische Exzellenz seit über 20 Jahren.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            size="lg"
            onClick={onCtaClick}
            className="bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground transition-all duration-200 ease-in-out text-base px-8 py-6 h-auto"
          >
            Unsere Leistungen ansehen
            <ArrowRight size={20} strokeWidth={1.5} className="ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;