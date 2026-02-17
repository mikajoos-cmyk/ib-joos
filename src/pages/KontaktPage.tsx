import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const KontaktPage = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check if subject was passed via navigation state
    if (location.state && location.state.subject) {
      setFormData(prev => ({
        ...prev,
        subject: location.state.subject,
      }));
    }
  }, [location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
                Kontakt
              </h1>
              <p className="text-gray-700 text-lg leading-relaxed">
                Haben Sie Fragen zu unseren Leistungen oder möchten Sie ein Projekt mit uns
                besprechen? Kontaktieren Sie uns – wir beraten Sie gerne.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-neutral">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold mb-8 text-gray-900">Schreiben Sie uns</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-gray-900">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-2 bg-neutral text-gray-900 border-gray-300"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-900">
                      E-Mail *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-2 bg-neutral text-gray-900 border-gray-300"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-gray-900">
                      Telefon
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-2 bg-neutral text-gray-900 border-gray-300"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-gray-900">
                      Betreff *
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="mt-2 bg-neutral text-gray-900 border-gray-300"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-gray-900">
                      Nachricht *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="mt-2 bg-neutral text-gray-900 border-gray-300"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground transition-all duration-200 ease-in-out text-base"
                  >
                    Nachricht senden
                  </Button>
                </form>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold mb-8 text-gray-900">
                    Kontaktinformationen
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <MapPin
                        size={24}
                        strokeWidth={1.5}
                        className="text-primary mt-1 flex-shrink-0"
                      />
                      <div>
                        <p className="font-semibold text-gray-900 mb-2">Adresse</p>
                        <p className="text-gray-700 leading-relaxed">
                          HLS Engineering GmbH
                          <br />
                          Musterstraße 123
                          <br />
                          12345 Berlin
                          <br />
                          Deutschland
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Phone size={24} strokeWidth={1.5} className="text-primary flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-2">Telefon</p>
                        <a
                          href="tel:+4930123456789"
                          className="text-gray-700 hover:text-primary transition-colors duration-200"
                        >
                          +49 30 123 456 789
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Mail size={24} strokeWidth={1.5} className="text-primary flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-2">E-Mail</p>
                        <a
                          href="mailto:info@hls-engineering.de"
                          className="text-gray-700 hover:text-primary transition-colors duration-200"
                        >
                          info@hls-engineering.de
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Clock size={24} strokeWidth={1.5} className="text-primary flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-2">Öffnungszeiten</p>
                        <p className="text-gray-700 leading-relaxed">
                          Montag - Freitag: 08:00 - 17:00 Uhr
                          <br />
                          Samstag - Sonntag: Geschlossen
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2427.4926871596!2d13.404954!3d52.520008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDMxJzEyLjAiTiAxM8KwMjQnMTcuOCJF!5e0!3m2!1sen!2sde!4v1234567890&key=YOUR_API_KEY"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="HLS Engineering Location"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default KontaktPage;