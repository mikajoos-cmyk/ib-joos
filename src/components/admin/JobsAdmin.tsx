import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { supabase, type JobPosition } from '../../lib/supabase';

const JobsAdmin = () => {
  const [jobs, setJobs] = useState<JobPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<JobPosition>>({
    title: '',
    location: '',
    type: '',
    description: '',
    responsibilities: [],
    requirements: [],
    benefits: [],
    salary: '',
    startDate: '',
  });

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('job_positions')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setJobs(data);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (editingId === 'new') {
      const { error } = await supabase.from('job_positions').insert([formData]);
      if (!error) {
        loadJobs();
        setEditingId(null);
        resetForm();
      }
    } else if (editingId) {
      const { error } = await supabase
        .from('job_positions')
        .update(formData)
        .eq('id', editingId);
      if (!error) {
        loadJobs();
        setEditingId(null);
        resetForm();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Möchten Sie diese Stellenanzeige wirklich löschen?')) {
      const { error } = await supabase.from('job_positions').delete().eq('id', id);
      if (!error) {
        loadJobs();
      }
    }
  };

  const handleEdit = (job: JobPosition) => {
    setEditingId(job.id);
    setFormData(job);
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
      type: '',
      description: '',
      responsibilities: [],
      requirements: [],
      benefits: [],
      salary: '',
      startDate: '',
    });
  };

  const handleArrayChange = (field: 'responsibilities' | 'requirements' | 'benefits', value: string) => {
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
        <h2 className="text-3xl font-bold text-gray-900">Stellenanzeigen verwalten</h2>
        <Button onClick={handleNew} className="bg-primary text-primary-foreground">
          <Plus size={20} strokeWidth={1.5} className="mr-2" />
          Neue Stellenanzeige
        </Button>
      </div>

      {editingId && (
        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="text-gray-900">
              {editingId === 'new' ? 'Neue Stellenanzeige erstellen' : 'Stellenanzeige bearbeiten'}
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
                <Label htmlFor="type">Typ *</Label>
                <Input
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="mt-2"
                  placeholder="z.B. Vollzeit, Teilzeit, Ausbildung"
                />
              </div>
              <div>
                <Label htmlFor="salary">Gehalt</Label>
                <Input
                  id="salary"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  className="mt-2"
                  placeholder="z.B. 55.000 - 75.000 € p.a."
                />
              </div>
            </div>

            <div>
              <Label htmlFor="startDate">Startdatum</Label>
              <Input
                id="startDate"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="mt-2"
                placeholder="z.B. Ab sofort oder nach Vereinbarung"
              />
            </div>

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
              <Label htmlFor="responsibilities">Aufgaben (eine pro Zeile)</Label>
              <Textarea
                id="responsibilities"
                value={formData.responsibilities?.join('\n') || ''}
                onChange={(e) => handleArrayChange('responsibilities', e.target.value)}
                className="mt-2"
                rows={5}
              />
            </div>

            <div>
              <Label htmlFor="requirements">Anforderungen (eine pro Zeile)</Label>
              <Textarea
                id="requirements"
                value={formData.requirements?.join('\n') || ''}
                onChange={(e) => handleArrayChange('requirements', e.target.value)}
                className="mt-2"
                rows={5}
              />
            </div>

            <div>
              <Label htmlFor="benefits">Benefits (eine pro Zeile)</Label>
              <Textarea
                id="benefits"
                value={formData.benefits?.join('\n') || ''}
                onChange={(e) => handleArrayChange('benefits', e.target.value)}
                className="mt-2"
                rows={5}
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
        {jobs.map((job) => (
          <Card key={job.id} className="bg-card text-card-foreground">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">{job.title}</CardTitle>
              <p className="text-sm text-gray-600">
                {job.location} • {job.type}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleEdit(job)}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <Edit size={16} strokeWidth={1.5} className="mr-2" />
                  Bearbeiten
                </Button>
                <Button
                  onClick={() => handleDelete(job.id)}
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

export default JobsAdmin;
