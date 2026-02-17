import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 py-16">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-100">Ingenierbüro Joos GmbH</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Ihr Partner für professionelle Heizungs-, Lüftungs- und Sanitärplanung.
              Technische Exzellenz seit über 20 Jahren.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-gray-100">Kontakt</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={20} strokeWidth={1.5} className="text-primary mt-1 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  Burgstraße 19<br />
                  72581 Dettingen an der Erms<br />
                  Deutschland
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} strokeWidth={1.5} className="text-primary flex-shrink-0" />
                <a href="tel:0049712388261" className="text-gray-300 text-sm hover:text-primary transition-colors duration-200">
                  +49 7123 88261
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} strokeWidth={1.5} className="text-primary flex-shrink-0" />
                <a href="mailto:info@ib-joos-gmbh.de" className="text-gray-300 text-sm hover:text-primary transition-colors duration-200">
                  info@ib-joos-gmbh.de
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-gray-100">Quick Links</h4>
            <nav className="space-y-3">
              <Link to="/" className="block text-gray-300 text-sm hover:text-primary transition-colors duration-200">
                Home
              </Link>
              <Link to="/leistungen" className="block text-gray-300 text-sm hover:text-primary transition-colors duration-200">
                Leistungen
              </Link>
              <Link to="/projekte" className="block text-gray-300 text-sm hover:text-primary transition-colors duration-200">
                Projekte
              </Link>
              <Link to="/ueber-uns" className="block text-gray-300 text-sm hover:text-primary transition-colors duration-200">
                Über uns
              </Link>
              <Link to="/karriere" className="block text-gray-300 text-sm hover:text-primary transition-colors duration-200">
                Karriere
              </Link>
              <Link to="/kontakt" className="block text-gray-300 text-sm hover:text-primary transition-colors duration-200">
                Kontakt
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-gray-100">Rechtliches</h4>
            <nav className="space-y-3">
              <a href="#" className="block text-gray-300 text-sm hover:text-primary transition-colors duration-200">
                Datenschutz
              </a>
              <a href="#" className="block text-gray-300 text-sm hover:text-primary transition-colors duration-200">
                Impressum
              </a>
              <a href="#" className="block text-gray-300 text-sm hover:text-primary transition-colors duration-200">
                AGB
              </a>
            </nav>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Ingenierbüro Joos GmbH. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;