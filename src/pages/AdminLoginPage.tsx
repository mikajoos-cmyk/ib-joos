import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      navigate('/admin/dashboard');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session) {
        navigate('/admin/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Login fehlgeschlagen');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-2 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <Card className="bg-card text-card-foreground">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <Lock size={32} strokeWidth={1.5} className="text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">Admin Login</CardTitle>
            <CardDescription className="text-gray-700">
              Melden Sie sich an, um auf das Admin-Panel zuzugreifen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div>
                <Label htmlFor="email" className="text-gray-900">
                  E-Mail
                </Label>
                <div className="relative mt-2">
                  <Mail
                    size={20}
                    strokeWidth={1.5}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-neutral text-gray-900 border-gray-300"
                    placeholder="admin@ib-joos-gmbh.de"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-900">
                  Passwort
                </Label>
                <div className="relative mt-2">
                  <Lock
                    size={20}
                    strokeWidth={1.5}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-neutral text-gray-900 border-gray-300"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground transition-all duration-200 ease-in-out"
              >
                {loading ? 'Anmeldung läuft...' : 'Anmelden'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
