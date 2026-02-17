import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { supabase, type TeamMember } from '../../lib/supabase';

const TeamAdmin = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<TeamMember>>({
    name: '',
    position: '',
    image: '',
    bio: '',
  });

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setMembers(data);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (editingId === 'new') {
      const { error } = await supabase.from('team_members').insert([formData]);
      if (!error) {
        loadMembers();
        setEditingId(null);
        resetForm();
      }
    } else if (editingId) {
      const { error } = await supabase
        .from('team_members')
        .update(formData)
        .eq('id', editingId);
      if (!error) {
        loadMembers();
        setEditingId(null);
        resetForm();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Möchten Sie dieses Team-Mitglied wirklich löschen?')) {
      const { error } = await supabase.from('team_members').delete().eq('id', id);
      if (!error) {
        loadMembers();
      }
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingId(member.id);
    setFormData(member);
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
      name: '',
      position: '',
      image: '',
      bio: '',
    });
  };

  if (loading) {
    return <div className="text-center py-12">Laden...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Team verwalten</h2>
        <Button onClick={handleNew} className="bg-primary text-primary-foreground">
          <Plus size={20} strokeWidth={1.5} className="mr-2" />
          Neues Mitglied
        </Button>
      </div>

      {editingId && (
        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="text-gray-900">
              {editingId === 'new' ? 'Neues Team-Mitglied erstellen' : 'Team-Mitglied bearbeiten'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="position">Position *</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="mt-2"
                  placeholder="z.B. Geschäftsführer, Projektingenieur"
                />
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
              <Label htmlFor="bio">Biografie</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {members.map((member) => (
          <Card key={member.id} className="bg-card text-card-foreground">
            <CardHeader>
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <CardTitle className="text-xl text-gray-900">{member.name}</CardTitle>
              <p className="text-sm text-gray-600">{member.position}</p>
            </CardHeader>
            <CardContent>
              {member.bio && <p className="text-gray-700 mb-4 line-clamp-2">{member.bio}</p>}
              <div className="flex gap-2">
                <Button
                  onClick={() => handleEdit(member)}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <Edit size={16} strokeWidth={1.5} className="mr-2" />
                  Bearbeiten
                </Button>
                <Button
                  onClick={() => handleDelete(member.id)}
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

export default TeamAdmin;
