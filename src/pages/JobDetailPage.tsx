import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, MapPin, Clock, Briefcase, CheckCircle2, Mail } from 'lucide-react';
import { getJobPositionById, type JobPosition } from '../lib/supabase';

const JobDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<JobPosition | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      loadJob(id);
    }
  }, [id]);

  const loadJob = async (jobId: string) => {
    setLoading(true);
    const data = await getJobPositionById(jobId);
    setJob(data);
    setLoading(false);
  };

  const handleApply = () => {
    if (job) {
      navigate('/kontakt', { state: { subject: `Bewerbung: ${job.title}` } });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-32 pb-24">
          <div className="container mx-auto px-8 lg:px-16 text-center">
            <p className="text-gray-700 text-lg">Stellenanzeige wird geladen...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-32 pb-24">
          <div className="container mx-auto px-8 lg:px-16 text-center">
            <h1 className="text-4xl font-bold mb-6 text-gray-900">Stellenanzeige nicht gefunden</h1>
            <Button
              onClick={() => navigate('/karriere')}
              className="bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground transition-all duration-200 ease-in-out"
            >
              <ArrowLeft size={20} strokeWidth={1.5} className="mr-2" />
              Zurück zu Karriere
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="pt-32 pb-16 bg-gradient-2">
          <div className="container mx-auto px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Button
                onClick={() => navigate('/karriere')}
                variant="ghost"
                className="mb-8 text-gray-700 hover:text-primary hover:bg-transparent transition-colors duration-200"
              >
                <ArrowLeft size={20} strokeWidth={1.5} className="mr-2" />
                Zurück zu Karriere
              </Button>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
                {job.title}
              </h1>

              <div className="flex flex-wrap gap-6 text-gray-700">
                <div className="flex items-center gap-2">
                  <MapPin size={20} strokeWidth={1.5} className="text-primary" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={20} strokeWidth={1.5} className="text-primary" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase size={20} strokeWidth={1.5} className="text-primary" />
                  <span>HLS Engineering</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-neutral">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <motion.div
                className="lg:col-span-2 space-y-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">Über die Position</h2>
                  <p className="text-gray-700 text-lg leading-relaxed">{job.description}</p>
                </div>

                {job.responsibilities && job.responsibilities.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-gray-900">Ihre Aufgaben</h3>
                    <ul className="space-y-3">
                      {job.responsibilities.map((responsibility, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2
                            size={24}
                            strokeWidth={1.5}
                            className="text-primary flex-shrink-0 mt-0.5"
                          />
                          <span className="text-gray-700 leading-relaxed">{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {job.requirements && job.requirements.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-gray-900">Ihr Profil</h3>
                    <ul className="space-y-3">
                      {job.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2
                            size={24}
                            strokeWidth={1.5}
                            className="text-primary flex-shrink-0 mt-0.5"
                          />
                          <span className="text-gray-700 leading-relaxed">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {job.benefits && job.benefits.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-gray-900">Wir bieten</h3>
                    <ul className="space-y-3">
                      {job.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2
                            size={24}
                            strokeWidth={1.5}
                            className="text-primary flex-shrink-0 mt-0.5"
                          />
                          <span className="text-gray-700 leading-relaxed">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Card className="sticky top-24 bg-card text-card-foreground">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-900">
                      Jetzt bewerben
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-gray-700 leading-relaxed">
                      Interessiert? Senden Sie uns Ihre Bewerbungsunterlagen und werden Sie Teil
                      unseres Teams!
                    </p>

                    <Button
                      onClick={handleApply}
                      className="w-full bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground transition-all duration-200 ease-in-out"
                      size="lg"
                    >
                      <Mail size={20} strokeWidth={1.5} className="mr-2" />
                      Bewerbung senden
                    </Button>

                    <div className="pt-6 border-t border-border">
                      <h4 className="font-semibold text-gray-900 mb-4">Kontakt</h4>
                      <div className="space-y-3 text-sm text-gray-700">
                        <p>
                          <strong>HLS Engineering GmbH</strong>
                        </p>
                        <p>Personalabteilung</p>
                        <p>
                          <a
                            href="mailto:karriere@hls-engineering.de"
                            className="text-primary hover:underline"
                          >
                            karriere@hls-engineering.de
                          </a>
                        </p>
                        <p>
                          <a href="tel:+4930123456789" className="text-primary hover:underline">
                            +49 30 123 456 789
                          </a>
                        </p>
                      </div>
                    </div>

                    {job.salary && (
                      <div className="pt-6 border-t border-border">
                        <h4 className="font-semibold text-gray-900 mb-2">Gehalt</h4>
                        <p className="text-gray-700">{job.salary}</p>
                      </div>
                    )}

                    {job.startDate && (
                      <div className="pt-6 border-t border-border">
                        <h4 className="font-semibold text-gray-900 mb-2">Startdatum</h4>
                        <p className="text-gray-700">{job.startDate}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default JobDetailPage;
