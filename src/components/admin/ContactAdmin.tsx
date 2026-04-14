import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Mail, Phone, Calendar, User, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getContactSubmissions, deleteContactSubmission, ContactSubmission } from '@/lib/supabase';

const ContactAdmin = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setLoading(true);
    const data = await getContactSubmissions();
    setSubmissions(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Möchten Sie diese Anfrage wirklich löschen?')) {
      const success = await deleteContactSubmission(id);
      if (success) {
        setSubmissions(submissions.filter(s => s.id !== id));
      }
    }
  };

  if (loading) {
    return <div className="text-center py-12">Laden...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Kontaktanfragen</h2>
        <Button onClick={fetchSubmissions} variant="outline" size="sm">
          Aktualisieren
        </Button>
      </div>

      {submissions.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            Keine Kontaktanfragen gefunden.
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {submissions.map((submission) => (
            <motion.div
              key={submission.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-bold flex items-center gap-2">
                        <User className="w-5 h-5 text-primary" />
                        {submission.name}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Calendar className="w-4 h-4" />
                        {submission.created_at ? new Date(submission.created_at).toLocaleString('de-DE') : 'Unbekannt'}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => submission.id && handleDelete(submission.id)}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <a href={`mailto:${submission.email}`} className="text-primary hover:underline">
                        {submission.email}
                      </a>
                    </div>
                    {submission.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <a href={`tel:${submission.phone}`} className="hover:underline text-gray-700">
                          {submission.phone}
                        </a>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-neutral p-4 rounded-md space-y-2 border border-border/50">
                    <div className="font-semibold text-gray-900 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      Betreff: {submission.subject}
                    </div>
                    <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {submission.message}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactAdmin;
