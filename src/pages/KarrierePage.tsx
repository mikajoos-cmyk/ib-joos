import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Award, TrendingUp, Heart, MapPin, Clock, Briefcase } from 'lucide-react';
import { getJobPositions, type JobPosition } from '../lib/supabase';

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

const KarrierePage = () => {
  const navigate = useNavigate();
  const [openPositions, setOpenPositions] = useState<JobPosition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadJobPositions();
  }, []);

  const loadJobPositions = async () => {
    setLoading(true);
    const data = await getJobPositions();
    setOpenPositions(data);
    setLoading(false);
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
                Karriere bei HLS Engineering
              </h1>
              <p className="text-gray-700 text-lg leading-relaxed">
                Werden Sie Teil unseres Teams und gestalten Sie die Zukunft der technischen
                Gebäudeausrüstung mit uns. Wir bieten spannende Herausforderungen und
                hervorragende Entwicklungsmöglichkeiten.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-neutral">
          <div className="container mx-auto px-8 lg:px-16">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Warum HLS Engineering?
              </h2>
              <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
                Bei uns erwartet Sie mehr als nur ein Job. Wir bieten ein Umfeld, in dem Sie sich
                persönlich und beruflich weiterentwickeln können.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  >
                    <Card className="text-center h-full bg-card text-card-foreground">
                      <CardHeader>
                        <div className="flex justify-center mb-4">
                          <Icon size={48} strokeWidth={1.5} className="text-primary" />
                        </div>
                        <CardTitle className="text-xl font-semibold text-gray-900">
                          {benefit.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 leading-relaxed">{benefit.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                  Unser Arbeitsumfeld
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Bei HLS Engineering arbeiten Sie in einem modernen, technisch bestens
                  ausgestatteten Umfeld. Unsere Büros bieten eine angenehme Atmosphäre, die
                  Kreativität und Produktivität fördert.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Wir legen großen Wert auf eine offene Kommunikationskultur und flache
                  Hierarchien. Ihre Ideen und Ihr Engagement sind bei uns willkommen und werden
                  geschätzt.
                </p>
              </div>
              <div>
                <img
                  src="https://c.animaapp.com/mlqcq0lzeGbSwA/img/ai_7.png"
                  alt="Moderner Büroraum Teamarbeit"
                  className="w-full h-auto rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-tertiary">
          <div className="container mx-auto px-8 lg:px-16">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Offene Stellen
              </h2>
              <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
                Entdecken Sie unsere aktuellen Stellenangebote und finden Sie die Position, die zu
                Ihnen passt.
              </p>
            </motion.div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-700 text-lg">Stellenangebote werden geladen...</p>
              </div>
            ) : openPositions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-700 text-lg">Aktuell keine offenen Stellen verfügbar.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {openPositions.map((position, index) => (
                  <motion.div
                    key={position.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  >
                    <Card className="h-full bg-card text-card-foreground">
                      <CardHeader>
                        <CardTitle className="text-2xl font-bold text-gray-900">
                          {position.title}
                        </CardTitle>
                        <CardDescription className="flex flex-wrap gap-4 mt-4">
                          <span className="flex items-center gap-2 text-gray-700">
                            <MapPin size={16} strokeWidth={1.5} className="text-primary" />
                            {position.location}
                          </span>
                          <span className="flex items-center gap-2 text-gray-700">
                            <Clock size={16} strokeWidth={1.5} className="text-primary" />
                            {position.type}
                          </span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 leading-relaxed mb-6">
                          {position.description}
                        </p>
                        <Button 
                          onClick={() => navigate(`/karriere/${position.id}`)}
                          className="w-full bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground transition-all duration-200 ease-in-out"
                        >
                          <Briefcase size={20} strokeWidth={1.5} className="mr-2" />
                          Mehr erfahren
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default KarrierePage;
