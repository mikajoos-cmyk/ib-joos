import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { getProjects, type Project } from '../lib/supabase';

const ProjekteSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const navigate = useNavigate();
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      const data = await getProjects();
      // Only show top projects or a limited number on home page if needed, 
      // but the issue says "the projects from supabase", so we show them all or at least the ones from DB.
      // Usually, on a landing page, you show the first 4 or 6.
      setProjects(data.slice(0, 4));
      setLoading(false);
    };
    loadProjects();
  }, []);

  return (
    <section ref={ref} id="projekte" className="py-24 lg:py-32 bg-neutral">
      <div className="container mx-auto px-8 lg:px-16">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            Unsere Projekte
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
            Entdecken Sie eine Auswahl unserer erfolgreich realisierten Projekte aus verschiedenen
            Bereichen der technischen Gebäudeausrüstung.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-700 text-lg">Projekte werden geladen...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card
                  className="overflow-hidden cursor-pointer transition-all duration-200 ease-in-out hover:border-primary bg-card text-card-foreground h-full"
                  onClick={() => navigate(`/projekte/${project.id}`)}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out"
                      loading="lazy"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ease-in-out ${
                        hoveredProject === project.id ? 'opacity-100' : 'opacity-70'
                      }`}
                    >
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <p className="text-primary text-sm font-medium mb-2">
                          {project.category} {project.year ? `• ${project.year}` : ''}
                        </p>
                        <h3 className="text-white text-xl font-semibold mb-2">{project.title}</h3>
                        <p className="text-gray-200 text-sm">{project.location}</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-gray-700 leading-relaxed">{project.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjekteSection;