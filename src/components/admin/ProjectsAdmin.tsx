import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { supabase, type Project } from '../../lib/supabase';
import ImageUpload from './ImageUpload';

const ProjectsAdmin = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    location: '',
    description: '',
    image: '',
    category: '',
    year: '',
    details: [],
    challenges: '',
    solution: '',
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setProjects(data);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (editingId === 'new') {
      const { error } = await supabase.from('projects').insert([formData]);
      if (!error) {
        loadProjects();
        setEditingId(null);
        resetForm();
      }
    } else if (editingId) {
      const { error } = await supabase
        .from('projects')
        .update(formData)
        .eq('id', editingId);
      if (!error) {
        loadProjects();
        setEditingId(null);
        resetForm();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Möchten Sie dieses Projekt wirklich löschen?')) {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (!error) {
        loadProjects();
      }
    }
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData(project);
  };

  const handleNew = () => {
    setEditingId('new');
    resetForm();
  };

  const handleCancel = () => {
    setEditingId(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      location: '',
      description: '',
      image: '',
      category: '',
      year: '',
      details: [],
      challenges: '',
      solution: '',
    });
  };

  const handleArrayChange = (field: 'details', value: string) => {
    setFormData({
      ...formData,
      [field]: value.split('\n').filter(item => item.trim() !== ''),
    });
  };

  if (loading) {
    return <div className="text-center py-12">Laden...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Projekte verwalten</h2>
        <Button onClick={handleNew} className="bg-primary text-primary-foreground">
          <Plus size={20} strokeWidth={1.5} className="mr-2" />
          Neues Projekt
        </Button>
      </div>

      {editingId && (
        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="text-gray-900">
              {editingId === 'new' ? 'Neues Projekt erstellen' : 'Projekt bearbeiten'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Titel *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="location">Standort *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="category">Kategorie *</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="mt-2"
                  placeholder="z.B. Gewerbe, Wohnbau, Industrie"
                />
              </div>
              <div>
                <Label htmlFor="year">Jahr *</Label>
                <Input
                  id="year"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="mt-2"
                  placeholder="z.B. 2023"
                />
              </div>
            </div>

            <ImageUpload 
              label="Projektbild *"
              value={formData.image || ''} 
              onChange={(url) => setFormData({ ...formData, image: url })} 
            />

            <div>
              <Label htmlFor="description">Beschreibung *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-2"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="details">Details (eine pro Zeile)</Label>
              <Textarea
                id="details"
                value={formData.details?.join('\n') || ''}
                onChange={(e) => handleArrayChange('details', e.target.value)}
                className="mt-2"
                rows={5}
                placeholder="Fläche: 5.000 m²&#10;Energieeffizienzklasse: A+&#10;..."
              />
            </div>

            <div>
              <Label htmlFor="challenges">Herausforderungen</Label>
              <Textarea
                id="challenges"
                value={formData.challenges}
                onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                className="mt-2"
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="solution">Lösung</Label>
              <Textarea
                id="solution"
                value={formData.solution}
                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                className="mt-2"
                rows={4}
              />
            </div>

            <div className="flex gap-4">
              <Button onClick={handleSave} className="bg-primary text-primary-foreground">
                <Save size={20} strokeWidth={1.5} className="mr-2" />
                Speichern
              </Button>
              <Button onClick={handleCancel} variant="outline">
                <X size={20} strokeWidth={1.5} className="mr-2" />
                Abbrechen
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="bg-card text-card-foreground">
            <CardHeader>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <CardTitle className="text-xl text-gray-900">{project.title}</CardTitle>
              <p className="text-sm text-gray-600">
                {project.category} • {project.year}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4 line-clamp-2">{project.description}</p>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleEdit(project)}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <Edit size={16} strokeWidth={1.5} className="mr-2" />
                  Bearbeiten
                </Button>
                <Button
                  onClick={() => handleDelete(project.id)}
                  variant="outline"
                  size="sm"
                  className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Trash2 size={16} strokeWidth={1.5} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectsAdmin;
