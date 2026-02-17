import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

const projects = [
  {
    id: 'projekt-1',
    title: 'Bürokomplex Berlin Mitte',
    location: 'Berlin',
    description: 'Komplette HLS-Planung für modernes Bürogebäude mit 5.000 m²',
    image: 'https://c.animaapp.com/mlqcq0lzeGbSwA/img/ai_7.png',
    category: 'Gewerbe',
  },
  {
    id: 'projekt-2',
    title: 'Wohnanlage Hamburg',
    location: 'Hamburg',
    description: 'Energieeffiziente Heizungs- und Lüftungsanlage für 120 Wohneinheiten',
    image: 'https://c.animaapp.com/mlqcq0lzeGbSwA/img/ai_3.png',
    category: 'Wohnbau',
  },
  {
    id: 'projekt-3',
    title: 'Industriehalle München',
    location: 'München',
    description: 'Industrielle Lüftungssysteme mit Wärmerückgewinnung',
    image: 'https://c.animaapp.com/mlqcq0lzeGbSwA/img/ai_4.png',
    category: 'Industrie',
  },
  {
    id: 'projekt-4',
    title: 'Krankenhaus Frankfurt',
    location: 'Frankfurt',
    description: 'Hochmoderne Sanitär- und Klimatechnik für Gesundheitseinrichtung',
    image: 'https://c.animaapp.com/mlqcq0lzeGbSwA/img/ai_5.png',
    category: 'Gesundheit',
  },
];

const ProjekteSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const navigate = useNavigate();
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card
                className="overflow-hidden cursor-pointer transition-all duration-200 ease-in-out hover:border-primary bg-card text-card-foreground"
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
                      <p className="text-primary text-sm font-medium mb-2">{project.category}</p>
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
      </div>
    </section>
  );
};

export default ProjekteSection;