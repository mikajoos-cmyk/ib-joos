import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Users, Award, TrendingUp, Heart } from 'lucide-react';

const benefits = [
  {
    icon: Users,
    title: 'Teamwork',
    description: 'Arbeiten Sie in einem motivierten und erfahrenen Team',
  },
  {
    icon: Award,
    title: 'Weiterbildung',
    description: 'Kontinuierliche Fort- und Weiterbildungsmöglichkeiten',
  },
  {
    icon: TrendingUp,
    title: 'Karriere',
    description: 'Klare Karriereperspektiven und Entwicklungschancen',
  },
  {
    icon: Heart,
    title: 'Work-Life-Balance',
    description: 'Flexible Arbeitszeiten und moderne Arbeitsumgebung',
  },
];

const KarriereSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const navigate = useNavigate();

  return (
    <section ref={ref} id="karriere" className="py-24 lg:py-32 bg-tertiary">
      <div className="container mx-auto px-8 lg:px-16">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            Karriere bei Ingenierbüro Joos GmbH
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
            Werden Sie Teil unseres Teams und gestalten Sie die Zukunft der technischen
            Gebäudeausrüstung mit uns.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-4">
                  <Icon size={48} strokeWidth={1.5} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{benefit.title}</h3>
                <p className="text-gray-700 leading-relaxed">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button
            size="lg"
            onClick={() => navigate('/karriere')}
            className="bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground transition-all duration-200 ease-in-out text-base"
          >
            Offene Stellen ansehen
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default KarriereSection;