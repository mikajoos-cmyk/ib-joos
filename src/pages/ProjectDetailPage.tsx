import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Calendar, Building2 } from 'lucide-react';
import { getProjectById, type Project } from '../lib/supabase';

const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      loadProject(id);
    }
  }, [id]);

  const loadProject = async (projectId: string) => {
    setLoading(true);
    const data = await getProjectById(projectId);
    setProject(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-32 pb-24">
          <div className="container mx-auto px-8 lg:px-16 text-center">
            <p className="text-gray-700 text-lg">Projekt wird geladen...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-32 pb-24">
          <div className="container mx-auto px-8 lg:px-16 text-center">
            <h1 className="text-4xl font-bold mb-6 text-gray-900">Projekt nicht gefunden</h1>
            <Button
              onClick={() => navigate('/projekte')}
              className="bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground transition-all duration-200 ease-in-out"
            >
              <ArrowLeft size={20} strokeWidth={1.5} className="mr-2" />
              Zurück zu Projekten
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
                onClick={() => navigate('/projekte')}
                variant="ghost"
                className="mb-8 text-gray-700 hover:text-primary hover:bg-transparent transition-colors duration-200"
              >
                <ArrowLeft size={20} strokeWidth={1.5} className="mr-2" />
                Zurück zu Projekten
              </Button>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
                {project.title}
              </h1>

              <div className="flex flex-wrap gap-6 text-gray-700">
                <div className="flex items-center gap-2">
                  <MapPin size={20} strokeWidth={1.5} className="text-primary" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 size={20} strokeWidth={1.5} className="text-primary" />
                  <span>{project.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={20} strokeWidth={1.5} className="text-primary" />
                  <span>{project.year}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-neutral">
          <div className="container mx-auto px-8 lg:px-16">
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto rounded-lg shadow-lg"
                loading="lazy"
              />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <motion.div
                className="lg:col-span-2 space-y-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div>
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">Projektbeschreibung</h2>
                  <p className="text-gray-700 text-lg leading-relaxed">{project.description}</p>
                </div>

                {project.challenges && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">Herausforderung</h3>
                    <p className="text-gray-700 leading-relaxed">{project.challenges}</p>
                  </div>
                )}

                {project.solution && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">Lösung</h3>
                    <p className="text-gray-700 leading-relaxed">{project.solution}</p>
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="bg-tertiary p-8 rounded-lg">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">Projektdetails</h3>
                  {project.details && project.details.length > 0 ? (
                    <ul className="space-y-3">
                      {project.details.map((detail: string, index: number) => (
                        <li key={index} className="text-gray-700 leading-relaxed">
                          • {detail}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-700">Keine Details verfügbar.</p>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
