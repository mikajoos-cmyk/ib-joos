import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'ib-joos-maps-consent';

interface MapEmbedProps {
  src: string;
  title: string;
}

const readStoredConsent = (): boolean => {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
};

/**
 * Zwei-Klick-Lösung für Google Maps: Die Karte (und damit jede Verbindung zu
 * Google) wird erst geladen, nachdem der Nutzer aktiv eingewilligt hat
 * (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG).
 */
const MapEmbed = ({ src, title }: MapEmbedProps) => {
  const [consented, setConsented] = useState<boolean>(readStoredConsent);
  const [remember, setRemember] = useState(false);

  const handleConsent = () => {
    if (remember) {
      try {
        localStorage.setItem(STORAGE_KEY, 'true');
      } catch {
        // localStorage nicht verfügbar – Auswahl gilt nur für diese Sitzung
      }
    }
    setConsented(true);
  };

  if (consented) {
    return (
      <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
        <iframe
          src={src}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={title}
        />
      </div>
    );
  }

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg border border-gray-300 bg-gray-100 flex items-center justify-center p-8">
      <div className="max-w-md text-center space-y-4">
        <div className="flex justify-center">
          <MapPin size={40} strokeWidth={1.5} className="text-primary" />
        </div>
        <p className="text-gray-700 text-sm leading-relaxed">
          Beim Laden der Karte werden Daten – unter anderem Ihre IP-Adresse – an Google
          übertragen; dabei findet eine Übermittlung in die USA statt. Details finden Sie in
          unserer{' '}
          <Link
            to="/datenschutz"
            className="text-primary hover:text-secondary underline transition-colors duration-200"
          >
            Datenschutzerklärung
          </Link>
          .
        </p>
        <label className="flex items-center justify-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          Meine Auswahl für zukünftige Besuche merken
        </label>
        <Button
          onClick={handleConsent}
          className="bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground transition-all duration-200 ease-in-out"
        >
          Google Maps laden
        </Button>
      </div>
    </div>
  );
};

export default MapEmbed;
