import { createClient } from '@supabase/supabase-js';

// Fallback to empty strings if environment variables are not set
// In production, these should be set via environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

// Types
export interface Project {
  id: string;
  title: string;
  location: string;
  description: string;
  image: string;
  category: string;
  year: string;
  details?: string[];
  challenges?: string;
  solution?: string;
  created_at?: string;
}

export interface JobPosition {
  id: string;
  title: string;
  location: string;
  type: string;
  description: string;
  responsibilities?: string[];
  requirements?: string[];
  benefits?: string[];
  salary?: string;
  start_date?: string;
  created_at?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  bio?: string;
  created_at?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  details: string[];
  created_at?: string;
}

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  created_at?: string;
}

// API Functions
export const getProjects = async (): Promise<Project[]> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Error fetching projects:', err);
    return [];
  }
};

export const submitContactForm = async (submission: ContactSubmission): Promise<{ success: boolean; error?: any }> => {
  try {
    const { error } = await supabase
      .from('contact_submissions')
      .insert([submission]);

    if (error) {
      console.error('Error submitting contact form:', error);
      return { success: false, error };
    }

    return { success: true };
  } catch (err) {
    console.error('Error submitting contact form:', err);
    return { success: false, error: err };
  }
};

export const getContactSubmissions = async (): Promise<ContactSubmission[]> => {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching contact submissions:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Error fetching contact submissions:', err);
    return [];
  }
};

export const deleteContactSubmission = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting contact submission:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Error deleting contact submission:', err);
    return false;
  }
};

export const getProjectById = async (id: string): Promise<Project | null> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching project:', error);
      return null;
    }

    return data || null;
  } catch (err) {
    console.error('Error fetching project:', err);
    return null;
  }
};

export const getJobPositions = async (): Promise<JobPosition[]> => {
  try {
    const { data, error } = await supabase
      .from('job_positions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching job positions:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Error fetching job positions:', err);
    return [];
  }
};

export const getJobPositionById = async (id: string): Promise<JobPosition | null> => {
  try {
    const { data, error } = await supabase
      .from('job_positions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching job position:', error);
      return null;
    }

    return data || null;
  } catch (err) {
    console.error('Error fetching job position:', err);
    return null;
  }
};

export const getTeamMembers = async (): Promise<TeamMember[]> => {
  try {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching team members:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Error fetching team members:', err);
    return [];
  }
};

export const getServices = async (): Promise<Service[]> => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching services:', error);
      return getMockServices();
    }

    return data && data.length > 0 ? data : getMockServices();
  } catch (err) {
    console.error('Error fetching services:', err);
    return getMockServices();
  }
};

// Mock Data Functions
const getMockProjects = (): Project[] => {
  return [
    {
      id: 'projekt-1',
      title: 'Bürokomplex Berlin Mitte',
      location: 'Berlin',
      description: 'Komplette HLS-Planung für modernes Bürogebäude mit 5.000 m²',
      image: 'https://c.animaapp.com/mlqcq0lzeGbSwA/img/ai_7.png',
      category: 'Gewerbe',
      year: '2023',
      details: [
        'Fläche: 5.000 m²',
        'Energieeffizienzklasse: A+',
        'Wärmepumpen-System mit Erdwärme',
        'Kontrollierte Lüftung mit Wärmerückgewinnung',
        'Smart Building Integration',
      ],
      challenges: 'Die Herausforderung bestand darin, ein hochmodernes Bürogebäude mit maximaler Energieeffizienz auszustatten, während gleichzeitig höchste Komfortansprüche erfüllt werden mussten. Die zentrale Lage in Berlin Mitte erforderte zudem eine besonders leise und platzsparende Lösung.',
      solution: 'Durch den Einsatz einer innovativen Wärmepumpe mit Erdwärme-Sonden konnten wir eine Energieeinsparung von 40% gegenüber konventionellen Systemen erreichen. Die kontrollierte Lüftungsanlage mit Wärmerückgewinnung sorgt für optimale Luftqualität bei minimalen Energieverlusten. Die Integration in das Smart Building System ermöglicht eine bedarfsgerechte Steuerung aller Anlagen.',
    },
    {
      id: 'projekt-2',
      title: 'Wohnanlage Hamburg',
      location: 'Hamburg',
      description: 'Energieeffiziente Heizungs- und Lüftungsanlage für 120 Wohneinheiten',
      image: 'https://c.animaapp.com/mlqcq0lzeGbSwA/img/ai_3.png',
      category: 'Wohnbau',
      year: '2023',
      details: [
        '120 Wohneinheiten',
        'Zentrale Wärmepumpenanlage',
        'Dezentrale Lüftungsgeräte mit Wärmerückgewinnung',
        'Photovoltaik-Anlage zur Eigenstromerzeugung',
        'KfW 40 Plus Standard',
      ],
      challenges: 'Bei diesem Großprojekt galt es, 120 Wohneinheiten mit einem zukunftssicheren und wirtschaftlichen Energiekonzept auszustatten. Die Anforderungen des KfW 40 Plus Standards mussten erfüllt werden, während die Betriebskosten für die Bewohner möglichst niedrig gehalten werden sollten.',
      solution: 'Wir entwickelten ein ganzheitliches Energiekonzept mit zentraler Wärmepumpenanlage und dezentralen Lüftungsgeräten. Die Integration einer Photovoltaik-Anlage ermöglicht die Eigenstromerzeugung und reduziert die Betriebskosten erheblich. Das Ergebnis: KfW 40 Plus Standard mit minimalen Nebenkosten für die Bewohner.',
    },
    {
      id: 'projekt-3',
      title: 'Industriehalle München',
      location: 'München',
      description: 'Industrielle Lüftungssysteme mit Wärmerückgewinnung',
      image: 'https://c.animaapp.com/mlqcq0lzeGbSwA/img/ai_4.png',
      category: 'Industrie',
      year: '2022',
      details: [
        'Hallenfläche: 8.000 m²',
        'Hochleistungs-Lüftungsanlage',
        'Wärmerückgewinnung 85%',
        'Hallenheizung mit Strahlungsheizflächen',
        'Prozesswärme-Integration',
      ],
      challenges: 'Die Produktionshalle erforderte eine leistungsstarke Lüftungsanlage zur Absaugung von Prozessabluft, während gleichzeitig die Energiekosten minimiert werden sollten. Die hohen Decken und die große Fläche stellten besondere Anforderungen an die Heizungsplanung.',
      solution: 'Durch eine Hochleistungs-Lüftungsanlage mit 85% Wärmerückgewinnung konnten wir die Abwärme aus der Produktion nutzen. Die Hallenheizung mit Strahlungsheizflächen sorgt für gleichmäßige Wärmeverteilung bei minimalem Energieverbrauch. Die Integration der Prozesswärme reduziert die Heizkosten um 60%.',
    },
    {
      id: 'projekt-4',
      title: 'Krankenhaus Frankfurt',
      location: 'Frankfurt',
      description: 'Hochmoderne Sanitär- und Klimatechnik für Gesundheitseinrichtung',
      image: 'https://c.animaapp.com/mlqcq0lzeGbSwA/img/ai_5.png',
      category: 'Gesundheit',
      year: '2022',
      details: [
        '250 Betten',
        'Reinraumtechnik für OP-Bereiche',
        'Redundante Klimatisierung',
        'Hygienische Trinkwasserinstallation',
        'Notstromversorgung für kritische Bereiche',
      ],
      challenges: 'Krankenhäuser stellen höchste Anforderungen an die technische Gebäudeausrüstung. Absolute Zuverlässigkeit, hygienische Standards und Energieeffizienz mussten in Einklang gebracht werden. Die Reinraumtechnik für OP-Bereiche erforderte besondere Expertise.',
      solution: 'Wir implementierten ein redundantes System mit höchsten Hygienestandards. Die Reinraumtechnik für die OP-Bereiche erfüllt alle medizinischen Anforderungen. Die hygienische Trinkwasserinstallation mit thermischer Desinfektion gewährleistet höchste Wasserqualität. Notstromsysteme sichern die Versorgung kritischer Bereiche.',
    },
    {
      id: 'projekt-5',
      title: 'Hotel Köln',
      location: 'Köln',
      description: 'Luxuriöse Sanitär- und Klimaanlagen für 4-Sterne-Hotel',
      image: 'https://c.animaapp.com/mlqcq0lzeGbSwA/img/ai_6.png',
      category: 'Gewerbe',
      year: '2021',
      details: [
        '150 Hotelzimmer',
        'Individuelle Klimatisierung',
        'Wellness-Bereich mit Schwimmbad',
        'Zentrale Warmwasserbereitung',
        'Energiemanagement-System',
      ],
      challenges: 'Das Hotel sollte höchsten Komfort für die Gäste bieten, während gleichzeitig die Betriebskosten optimiert werden sollten. Die individuelle Klimatisierung jedes Zimmers und der energieintensive Wellness-Bereich stellten besondere Herausforderungen dar.',
      solution: 'Wir entwickelten ein intelligentes Energiemanagement-System, das Komfort und Effizienz vereint. Die individuelle Klimatisierung mit Präsenzerkennung reduziert den Energieverbrauch in ungenutzten Räumen. Die Abwärme aus der Kälteanlage wird zur Schwimmbadbeheizung genutzt, was die Energiekosten um 35% senkt.',
    },
    {
      id: 'projekt-6',
      title: 'Einkaufszentrum Stuttgart',
      location: 'Stuttgart',
      description: 'Großflächige Klimatisierung und Sanitäranlagen für Shopping-Center',
      image: 'https://c.animaapp.com/mlqcq0lzeGbSwA/img/ai_7.png',
      category: 'Gewerbe',
      year: '2021',
      details: [
        'Verkaufsfläche: 15.000 m²',
        'Zentrale Klimaanlage mit Kältemaschinen',
        'Öffentliche Sanitäranlagen',
        'Gastronomie-Versorgung',
        'Gebäudeleittechnik',
      ],
      challenges: 'Die großen Besucherströme und unterschiedlichen Nutzungsbereiche erforderten ein flexibles und leistungsstarkes System. Die öffentlichen Sanitäranlagen mussten besonders robust und hygienisch sein, während die Gastronomie-Bereiche spezielle Anforderungen stellten.',
      solution: 'Eine zentrale Klimaanlage mit mehreren Kältemaschinen sorgt für optimale Temperaturen in allen Bereichen. Die zonenweise Steuerung ermöglicht eine bedarfsgerechte Klimatisierung. Die Sanitäranlagen wurden mit berührungslosen Armaturen und automatischer Reinigung ausgestattet. Die Gebäudeleittechnik optimiert den Betrieb kontinuierlich.',
    },
  ];
};

const getMockServices = (): Service[] => {
  return [
    {
      id: 'heizung',
      title: 'Heizung',
      description: 'Moderne Heizsysteme für optimale Energieeffizienz und Komfort.',
      icon: 'Flame',
      image: 'https://c.animaapp.com/mlqcq0lzeGbSwA/img/ai_3.png',
      details: [
        'Planung und Installation von Heizungsanlagen',
        'Wärmepumpen und Solarthermie',
        'Brennwerttechnik und Hybridheizungen',
        'Wartung und Optimierung bestehender Systeme',
      ],
    },
    {
      id: 'lueftung',
      title: 'Lüftung',
      description: 'Intelligente Lüftungslösungen für gesunde Raumluft und Klimatisierung.',
      icon: 'Wind',
      image: 'https://c.animaapp.com/mlqcq0lzeGbSwA/img/ai_4.png',
      details: [
        'Kontrollierte Wohnraumlüftung',
        'Klimaanlagen und Kühltechnik',
        'Lüftungsanlagen mit Wärmerückgewinnung',
        'Luftqualitätsmanagement',
      ],
    },
    {
      id: 'sanitaer',
      title: 'Sanitärplanung',
      description: 'Professionelle Sanitärinstallationen nach neuesten Standards.',
      icon: 'Droplet',
      image: 'https://c.animaapp.com/mlqcq0lzeGbSwA/img/ai_5.png',
      details: [
        'Trinkwasserinstallationen',
        'Abwassersysteme und Entwässerung',
        'Regenwassernutzung',
        'Sanitärobjekte und Armaturen',
      ],
    },
    {
      id: 'energie',
      title: 'Energieoptimierung',
      description: 'Nachhaltige Energiekonzepte für maximale Effizienz und Kosteneinsparung.',
      icon: 'Zap',
      image: 'https://c.animaapp.com/mlqcq0lzeGbSwA/img/ai_6.png',
      details: [
        'Energieberatung und -analyse',
        'Gebäudeautomation und Smart Home',
        'Photovoltaik-Integration',
        'Energieeffizienz-Optimierung',
      ],
    },
  ];
};
