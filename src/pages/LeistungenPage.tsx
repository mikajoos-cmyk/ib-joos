import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flame, Wind, Droplet, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { getServices, type Service } from '../lib/supabase';

const iconMap: Record<string, any> = {
  Flame,
  Wind,
  Droplet,
  Zap,
};

const LeistungenPage = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadServices();
  }, []);

  const loadServices = async () => {
    setLoading(true);
    const data = await getServices();
    setServices(data);
    setLoading(false);
  };

  const handleAnfrage = (serviceTitle: string) => {
    navigate('/kontakt', { state: { subject: `Anfrage: ${serviceTitle}` } });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="pt-32 pb-16 bg-gradient-2">
          <div className="container mx-auto px-8 lg:px-16">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
                Unsere Leistungen
              </h1>
              <p className="text-gray-700 text-lg leading-relaxed">
                Von der Planung bis zur Umsetzung bieten wir umfassende Lösungen für alle Bereiche
                der technischen Gebäudeausrüstung. Unsere Expertise garantiert höchste Qualität und
                Effizienz.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-neutral">
          <div className="container mx-auto px-8 lg:px-16">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-700 text-lg">Leistungen werden geladen...</p>
              </div>
            ) : (
              <div className="space-y-24">
                {services.map((service, index) => {
                  const Icon = iconMap[service.icon] || Flame;
                  const isEven = index % 2 === 0;
                  return (
                    <motion.div
                      key={service.id}
                      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                        isEven ? '' : 'lg:grid-flow-dense'
                      }`}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.8 }}
                    >
                      <div className={isEven ? '' : 'lg:col-start-2'}>
                        <Card className="bg-card text-card-foreground">
                          <CardHeader>
                            <div className="mb-4">
                              <Icon size={56} strokeWidth={1.5} className="text-primary" />
                            </div>
                            <CardTitle className="text-3xl font-bold text-gray-900">
                              {service.title}
                            </CardTitle>
                            <CardDescription className="text-lg text-gray-700">
                              {service.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-3 mb-6">
                              {service.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                  <CheckCircle2
                                    size={24}
                                    strokeWidth={1.5}
                                    className="text-primary flex-shrink-0 mt-0.5"
                                  />
                                  <span className="text-gray-700">{detail}</span>
                                </li>
                              ))}
                            </ul>
                            <Button
                              onClick={() => handleAnfrage(service.title)}
                              className="w-full bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground transition-all duration-200 ease-in-out"
                            >
                              Anfrage stellen
                              <ArrowRight size={20} strokeWidth={1.5} className="ml-2" />
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                      <div className={isEven ? '' : 'lg:col-start-1 lg:row-start-1'}>
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-auto rounded-lg shadow-lg"
                          loading="lazy"
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LeistungenPage;
