import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { supabase, type Service } from '../../lib/supabase';

const ServicesAdmin = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Service>>({
    title: '',
    description: '',
    icon: 'Flame',
    image: '',
    details: [],
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setServices(data);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (editingId === 'new') {
      const { error } = await supabase.from('services').insert([formData]);
      if (!error) {
        loadServices();
        setEditingId(null);
        resetForm();
      }
    } else if (editingId) {
      const { error } = await supabase
        .from('services')
        .update(formData)
        .eq('id', editingId);
      if (!error) {
        loadServices();
        setEditingId(null);
        resetForm();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Möchten Sie diese Leistung wirklich löschen?')) {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (!error) {
        loadServices();
      }
    }
  };

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setFormData(service);
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
      description: '',
      icon: 'Flame',
      image: '',
      details: [],
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
        <h2 className="text-3xl font-bold text-gray-900">Leistungen verwalten</h2>
        <Button onClick={handleNew} className="bg-primary text-primary-foreground">
          <Plus size={20} strokeWidth={1.5} className="mr-2" />
          Neue Leistung
        </Button>
      </div>

      {editingId && (
        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="text-gray-900">
              {editingId === 'new' ? 'Neue Leistung erstellen' : 'Leistung bearbeiten'}
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
                <Label htmlFor="icon">Icon *</Label>
                <select
                  id="icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="mt-2 w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                >
                  <option value="Flame">Flame (Heizung)</option>
                  <option value="Wind">Wind (Lüftung)</option>
                  <option value="Droplet">Droplet (Sanitär)</option>
                  <option value="Zap">Zap (Energie)</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="image">Bild-URL *</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="mt-2"
                placeholder="https://..."
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
              <Label htmlFor="details">Details (eine pro Zeile) *</Label>
              <Textarea
                id="details"
                value={formData.details?.join('\n') || ''}
                onChange={(e) => handleArrayChange('details', e.target.value)}
                className="mt-2"
                rows={5}
                placeholder="Planung und Installation von Heizungsanlagen&#10;Wärmepumpen und Solarthermie&#10;..."
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <Card key={service.id} className="bg-card text-card-foreground">
            <CardHeader>
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <CardTitle className="text-xl text-gray-900">{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4 line-clamp-2">{service.description}</p>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleEdit(service)}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <Edit size={16} strokeWidth={1.5} className="mr-2" />
                  Bearbeiten
                </Button>
                <Button
                  onClick={() => handleDelete(service.id)}
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

export default ServicesAdmin;
