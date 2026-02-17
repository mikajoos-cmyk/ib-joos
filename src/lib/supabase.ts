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
  startDate?: string;
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

// API Functions
export const getProjects = async (): Promise<Project[]> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      return getMockProjects();
    }

    return data && data.length > 0 ? data : getMockProjects();
  } catch (err) {
    console.error('Error fetching projects:', err);
    return getMockProjects();
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
      const mockProjects = getMockProjects();
      return mockProjects.find(p => p.id === id) || null;
    }

    if (!data) {
      const mockProjects = getMockProjects();
      return mockProjects.find(p => p.id === id) || null;
    }

    return data;
  } catch (err) {
    console.error('Error fetching project:', err);
    const mockProjects = getMockProjects();
    return mockProjects.find(p => p.id === id) || null;
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
      return getMockJobPositions();
    }

    return data && data.length > 0 ? data : getMockJobPositions();
  } catch (err) {
    console.error('Error fetching job positions:', err);
    return getMockJobPositions();
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
      const mockJobs = getMockJobPositions();
      return mockJobs.find(j => j.id === id) || null;
    }

    if (!data) {
      const mockJobs = getMockJobPositions();
      return mockJobs.find(j => j.id === id) || null;
    }

    return data;
  } catch (err) {
    console.error('Error fetching job position:', err);
    const mockJobs = getMockJobPositions();
    return mockJobs.find(j => j.id === id) || null;
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

const getMockJobPositions = (): JobPosition[] => {
  return [
    {
      id: 'job-1',
      title: 'Projektingenieur HLS (m/w/d)',
      location: 'Berlin',
      type: 'Vollzeit',
      description: 'Wir suchen einen erfahrenen Projektingenieur für die Planung und Umsetzung von HLS-Projekten. Sie übernehmen die technische Leitung von Projekten und arbeiten eng mit unserem Team zusammen.',
      responsibilities: [
        'Eigenverantwortliche Planung und Projektierung von HLS-Anlagen',
        'Technische Leitung von Projekten von der Konzeption bis zur Inbetriebnahme',
        'Koordination mit Architekten, Fachplanern und ausführenden Firmen',
        'Erstellung von Ausschreibungen und Leistungsverzeichnissen',
        'Bauüberwachung und Qualitätskontrolle',
        'Beratung unserer Kunden in technischen Fragen',
      ],
      requirements: [
        'Abgeschlossenes Studium im Bereich Versorgungstechnik, TGA oder vergleichbar',
        'Mehrjährige Berufserfahrung in der HLS-Planung',
        'Fundierte Kenntnisse in CAD-Software (AutoCAD, Revit)',
        'Kenntnisse der einschlägigen Normen und Vorschriften',
        'Selbstständige und strukturierte Arbeitsweise',
        'Teamfähigkeit und Kommunikationsstärke',
      ],
      benefits: [
        'Attraktives Gehalt und leistungsgerechte Vergütung',
        'Flexible Arbeitszeiten und Homeoffice-Möglichkeiten',
        'Moderne Arbeitsausstattung und Software',
        'Weiterbildungsmöglichkeiten und Zertifizierungen',
        'Betriebliche Altersvorsorge',
        'Firmenwagen (nach Absprache)',
        'Kollegiales Team und flache Hierarchien',
      ],
      salary: '55.000 - 75.000 € p.a.',
      startDate: 'Ab sofort oder nach Vereinbarung',
    },
    {
      id: 'job-2',
      title: 'Technischer Zeichner HLS (m/w/d)',
      location: 'Berlin',
      type: 'Vollzeit',
      description: 'Zur Verstärkung unseres Teams suchen wir einen technischen Zeichner mit Erfahrung in CAD-Software. Sie erstellen technische Zeichnungen und Pläne für unsere Projekte.',
      responsibilities: [
        'Erstellung von technischen Zeichnungen und Plänen für HLS-Anlagen',
        'Ausarbeitung von Entwurfs- und Ausführungsplanungen',
        'Erstellung von Detailzeichnungen und Isometrien',
        'Pflege und Verwaltung der CAD-Bibliotheken',
        'Zusammenarbeit mit Ingenieuren und Projektleitern',
        'Qualitätskontrolle der erstellten Pläne',
      ],
      requirements: [
        'Abgeschlossene Ausbildung als Technischer Zeichner oder vergleichbar',
        'Erfahrung in der Erstellung von HLS-Plänen',
        'Sehr gute Kenntnisse in AutoCAD und/oder Revit',
        'Kenntnisse der technischen Regelwerke',
        'Sorgfältige und präzise Arbeitsweise',
        'Teamfähigkeit und Zuverlässigkeit',
      ],
      benefits: [
        'Unbefristeter Arbeitsvertrag',
        'Geregelte Arbeitszeiten ohne Schichtdienst',
        'Moderne CAD-Arbeitsplätze',
        'Schulungen und Weiterbildungen',
        'Betriebliche Altersvorsorge',
        'Angenehmes Arbeitsklima',
      ],
      salary: '38.000 - 48.000 € p.a.',
      startDate: 'Ab sofort',
    },
    {
      id: 'job-3',
      title: 'Bauleiter HLS (m/w/d)',
      location: 'Hamburg',
      type: 'Vollzeit',
      description: 'Für unsere Projekte in Hamburg suchen wir einen erfahrenen Bauleiter. Sie koordinieren die Bauausführung und sind Ansprechpartner für alle Beteiligten vor Ort.',
      responsibilities: [
        'Bauleitung und Koordination der HLS-Gewerke',
        'Überwachung der Bauausführung hinsichtlich Qualität, Kosten und Terminen',
        'Führung und Koordination der ausführenden Firmen',
        'Durchführung von Baubesprechungen',
        'Abnahme und Dokumentation der ausgeführten Leistungen',
        'Mängelmanagement und Nachtragsbearbeitung',
      ],
      requirements: [
        'Abgeschlossene Ausbildung als Meister oder Techniker im SHK-Bereich',
        'Mehrjährige Erfahrung in der Bauleitung',
        'Fundierte Kenntnisse der VOB und HOAI',
        'Durchsetzungsvermögen und Organisationstalent',
        'Führerschein Klasse B',
        'Reisebereitschaft im Raum Hamburg',
      ],
      benefits: [
        'Verantwortungsvolle Position mit Gestaltungsspielraum',
        'Firmenwagen auch zur privaten Nutzung',
        'Leistungsgerechte Vergütung',
        'Moderne technische Ausstattung',
        'Weiterbildungsmöglichkeiten',
        'Betriebliche Altersvorsorge',
      ],
      salary: '50.000 - 65.000 € p.a.',
      startDate: 'Nach Vereinbarung',
    },
    {
      id: 'job-4',
      title: 'Auszubildender Anlagenmechaniker SHK (m/w/d)',
      location: 'Berlin',
      type: 'Ausbildung',
      description: 'Starte deine Karriere mit einer Ausbildung zum Anlagenmechaniker für Sanitär-, Heizungs- und Klimatechnik. Wir bieten eine fundierte Ausbildung in einem modernen Unternehmen.',
      responsibilities: [
        'Erlernen der Installation von Heizungs-, Lüftungs- und Sanitäranlagen',
        'Wartung und Instandhaltung von technischen Anlagen',
        'Kundenberatung und -betreuung',
        'Fehlerdiagnose und Störungsbehebung',
        'Dokumentation der durchgeführten Arbeiten',
      ],
      requirements: [
        'Guter Hauptschul- oder Realschulabschluss',
        'Interesse an Technik und handwerklichem Arbeiten',
        'Sorgfältige und zuverlässige Arbeitsweise',
        'Teamfähigkeit und Lernbereitschaft',
        'Gute Mathematik- und Physikkenntnisse',
      ],
      benefits: [
        'Ausbildungsvergütung nach Tarif',
        'Übernahmegarantie bei guten Leistungen',
        'Moderne Ausbildungswerkstatt',
        'Erfahrene Ausbilder und Mentoren',
        'Prüfungsvorbereitung und Nachhilfe',
        'Azubi-Events und Teambuilding',
      ],
      salary: 'Nach Tarifvertrag',
      startDate: '01.08.2026',
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
