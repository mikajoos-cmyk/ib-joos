import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const KontaktSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

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
    <section ref={ref} id="kontakt" className="py-24 lg:py-32 bg-neutral">
      <div className="container mx-auto px-8 lg:px-16">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            Kontakt
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
            Haben Sie Fragen zu unseren Leistungen oder möchten Sie ein Projekt mit uns
            besprechen? Kontaktieren Sie uns – wir beraten Sie gerne.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-gray-900">Schreiben Sie uns</h3>
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
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-8 text-gray-900">
                Kontaktinformationen
              </h3>
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
                      Ingenierbüro Joos GmbH
                      <br />
                      Burgstraße 19
                      <br />
                      72581 Dettingen an der Erms
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
                      href="tel:0049712388261"
                      className="text-gray-700 hover:text-primary transition-colors duration-200"
                    >
                      +49 7123 88261
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail size={24} strokeWidth={1.5} className="text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">E-Mail</p>
                    <a
                      href="mailto:info@ib-joos-gmbh.de"
                      className="text-gray-700 hover:text-primary transition-colors duration-200"
                    >
                      info@ib-joos-gmbh.de
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2642.07548475765!2d9.3527794!3d48.53178510000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479992e53b94787d%3A0x7bd3a4e62a7c873!2sIngenieur%20B%C3%BCro%20Joos%20GmbH!5e0!3m2!1sde!2sde!4v1771323944099!5m2!1sde!2sde"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ingenierbüro Joos GmbH Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default KontaktSection;