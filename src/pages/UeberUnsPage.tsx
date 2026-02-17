import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Users, Award, TrendingUp } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Präzision',
    description:
      'Wir arbeiten mit höchster Genauigkeit und Sorgfalt, um technische Exzellenz zu gewährleisten.',
  },
  {
    icon: Users,
    title: 'Teamwork',
    description:
      'Unser erfahrenes Team arbeitet Hand in Hand, um optimale Ergebnisse zu erzielen.',
  },
  {
    icon: Award,
    title: 'Qualität',
    description:
      'Höchste Qualitätsstandards sind die Grundlage unserer Arbeit und unseres Erfolgs.',
  },
  {
    icon: TrendingUp,
    title: 'Innovation',
    description:
      'Wir setzen auf modernste Technologien und innovative Lösungen für nachhaltige Ergebnisse.',
  },
];

const UeberUnsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                Über uns
              </h1>
              <p className="text-gray-700 text-lg leading-relaxed">
                Mit über 20 Jahren Erfahrung sind wir Ihr zuverlässiger Partner für technische
                Gebäudeausrüstung. Lernen Sie unser Team und unsere Werte kennen.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-neutral">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                  Unsere Geschichte
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Seit über 20 Jahren steht Ingenierbüro Joos GmbH für technische Exzellenz im Bereich
                  Heizung, Lüftung und Sanitär. Was als kleines Ingenieurbüro begann, hat sich zu
                  einem führenden Unternehmen in der Branche entwickelt.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Unser Erfolg basiert auf der Kombination aus fundiertem Fachwissen, innovativen
                  Lösungen und einem engagierten Team von Spezialisten. Wir haben hunderte Projekte
                  erfolgreich realisiert – von Wohngebäuden über Gewerbeimmobilien bis hin zu
                  komplexen Industrieanlagen.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Heute beschäftigen wir über 50 Mitarbeiter und sind stolz darauf, zu den
                  führenden Unternehmen in unserem Bereich zu gehören. Dabei bleiben wir unseren
                  Werten treu: Qualität, Zuverlässigkeit und Kundenzufriedenheit.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <img
                  src="https://c.animaapp.com/mlqcq0lzeGbSwA/img/ai_2.png"
                  alt="Ingenieure bei Planung"
                  className="w-full h-auto rounded-lg shadow-lg"
                  loading="lazy"
                />
              </motion.div>
            </div>

            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">
                Unsere Werte
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <motion.div
                      key={value.title}
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
                            {value.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 leading-relaxed">{value.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-tertiary">
          <div className="container mx-auto px-8 lg:px-16">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Unser Team
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                Unser Team besteht aus hochqualifizierten Ingenieuren, Technikern und
                Projektmanagern, die mit Leidenschaft und Expertise an jedem Projekt arbeiten. Wir
                investieren kontinuierlich in die Weiterbildung unserer Mitarbeiter, um stets auf
                dem neuesten Stand der Technik zu sein.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <p className="text-5xl font-bold text-primary mb-2">50+</p>
                  <p className="text-gray-700 text-lg">Mitarbeiter</p>
                </div>
                <div className="text-center">
                  <p className="text-5xl font-bold text-primary mb-2">20+</p>
                  <p className="text-gray-700 text-lg">Jahre Erfahrung</p>
                </div>
                <div className="text-center">
                  <p className="text-5xl font-bold text-primary mb-2">500+</p>
                  <p className="text-gray-700 text-lg">Projekte</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default UeberUnsPage;