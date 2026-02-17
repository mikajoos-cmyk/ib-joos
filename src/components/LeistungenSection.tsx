import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, Wind, Droplet, Zap } from 'lucide-react';
import { getServices, type Service } from '../lib/supabase';

const iconMap: Record<string, any> = {
  Flame,
  Wind,
  Droplet,
  Zap,
};

const LeistungenSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setLoading(true);
    const data = await getServices();
    setServices(data);
    setLoading(false);
  };

  return (
    <section ref={ref} id="leistungen" className="py-24 lg:py-32 bg-tertiary">
      <div className="container mx-auto px-8 lg:px-16">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            Unsere Leistungen
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
            Von der Planung bis zur Umsetzung – wir bieten umfassende Lösungen für alle Bereiche
            der technischen Gebäudeausrüstung.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-700 text-lg">Leistungen werden geladen...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Flame;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card
                    className="h-full cursor-pointer transition-all duration-200 ease-in-out hover:border-primary bg-card text-card-foreground"
                    onClick={() => navigate('/leistungen')}
                  >
                    <CardHeader>
                      <div className="mb-4">
                        <Icon size={48} strokeWidth={1.5} className="text-primary" />
                      </div>
                      <CardTitle className="text-xl font-semibold text-gray-900">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-700 leading-relaxed">
                        {service.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default LeistungenSection;
