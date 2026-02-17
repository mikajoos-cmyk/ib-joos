import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const navigate = useNavigate();

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-neutral">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              Über uns
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Mit über 20 Jahren Erfahrung in der technischen Gebäudeausrüstung sind wir Ihr
              zuverlässiger Partner für innovative und nachhaltige Lösungen im Bereich Heizung,
              Lüftung und Sanitär.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Unser Team aus hochqualifizierten Ingenieuren und Technikern setzt auf modernste
              Technologien und bewährte Methoden, um Ihre Projekte termingerecht und in höchster
              Qualität umzusetzen.
            </p>
            <Button
              onClick={() => navigate('/ueber-uns')}
              className="bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground transition-all duration-200 ease-in-out text-base"
            >
              Mehr über uns
              <ArrowRight size={20} strokeWidth={1.5} className="ml-2" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <img
              src="https://c.animaapp.com/mlqcq0lzeGbSwA/img/ai_2.png"
              alt="Ingenieure bei Planung"
              className="w-full h-auto rounded-lg shadow-lg"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;