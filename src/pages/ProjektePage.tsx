    import { useEffect, useState } from 'react';
    import { motion } from 'framer-motion';
    import { useNavigate } from 'react-router-dom';
    import Header from '../components/Header';
    import Footer from '../components/Footer';
    import { Card, CardContent } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { getProjects, type Project } from '../lib/supabase';

    const ProjektePage = () => {
      const [selectedCategory, setSelectedCategory] = useState('Alle');
      const [hoveredProject, setHoveredProject] = useState<string | null>(null);
      const [projects, setProjects] = useState<Project[]>([]);
      const [loading, setLoading] = useState(true);
      const [categories, setCategories] = useState<string[]>(['Alle']);
      const navigate = useNavigate();

      useEffect(() => {
        window.scrollTo(0, 0);
        loadProjects();
      }, []);

      const loadProjects = async () => {
        setLoading(true);
        const data = await getProjects();
        setProjects(data);
        
        // Extract unique categories
        const uniqueCategories = ['Alle', ...new Set(data.map(p => p.category))];
        setCategories(uniqueCategories);
        
        setLoading(false);
      };

      const filteredProjects =
        selectedCategory === 'Alle'
          ? projects
          : projects.filter((project) => project.category === selectedCategory);

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
                Unsere Projekte
              </h1>
              <p className="text-gray-700 text-lg leading-relaxed">
                Entdecken Sie eine Auswahl unserer erfolgreich realisierten Projekte aus
                verschiedenen Bereichen der technischen Gebäudeausrüstung.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-neutral">
          <div className="container mx-auto px-8 lg:px-16">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-700 text-lg">Projekte werden geladen...</p>
              </div>
            ) : (
              <>
                <motion.div
                  className="flex flex-wrap justify-center gap-4 mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className={
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground transition-all duration-200 ease-in-out'
                      : 'bg-transparent text-gray-700 border-gray-300 hover:bg-tertiary hover:text-gray-900 hover:border-primary transition-all duration-200 ease-in-out'
                  }
                >
                  {category}
                </Button>
                  ))}
                </motion.div>

                {filteredProjects.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-700 text-lg">Keine Projekte gefunden.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
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
                            {project.category} • {project.year}
                          </p>
                          <h3 className="text-white text-xl font-semibold mb-2">
                            {project.title}
                          </h3>
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
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProjektePage;