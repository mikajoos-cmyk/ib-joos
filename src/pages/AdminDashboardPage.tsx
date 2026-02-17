import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Briefcase, Users, Wrench, FolderOpen } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ProjectsAdmin from '../components/admin/ProjectsAdmin';
import JobsAdmin from '../components/admin/JobsAdmin';
import ServicesAdmin from '../components/admin/ServicesAdmin';
import TeamAdmin from '../components/admin/TeamAdmin';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    // TEMPORARY: Bypass authentication for development
    setUserEmail('admin@hls-engineering.de');
    setLoading(false);
    
    /* 
    // Original authentication code - uncomment for production:
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/admin/login');
    } else {
      setUserEmail(session.user.email || '');
      setLoading(false);
    }
    */
  };

  const handleLogout = async () => {
    // TEMPORARY: Just navigate without actual logout
    navigate('/admin/login');
    
    /*
    // Original logout code - uncomment for production:
    await supabase.auth.signOut();
    navigate('/admin/login');
    */
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral flex items-center justify-center">
        <p className="text-gray-700 text-lg">Laden...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-sm text-gray-600">Angemeldet als: {userEmail}</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-gray-700 border-gray-300 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
            >
              <LogOut size={20} strokeWidth={1.5} className="mr-2" />
              Abmelden
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="projects" className="flex items-center gap-2">
                <FolderOpen size={20} strokeWidth={1.5} />
                Projekte
              </TabsTrigger>
              <TabsTrigger value="jobs" className="flex items-center gap-2">
                <Briefcase size={20} strokeWidth={1.5} />
                Stellenanzeigen
              </TabsTrigger>
              <TabsTrigger value="services" className="flex items-center gap-2">
                <Wrench size={20} strokeWidth={1.5} />
                Leistungen
              </TabsTrigger>
              <TabsTrigger value="team" className="flex items-center gap-2">
                <Users size={20} strokeWidth={1.5} />
                Team
              </TabsTrigger>
            </TabsList>

            <TabsContent value="projects">
              <ProjectsAdmin />
            </TabsContent>

            <TabsContent value="jobs">
              <JobsAdmin />
            </TabsContent>

            <TabsContent value="services">
              <ServicesAdmin />
            </TabsContent>

            <TabsContent value="team">
              <TeamAdmin />
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
