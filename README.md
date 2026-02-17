# HLS Engineering Website

Moderne Website für ein Ingenieurbüro im Heizungs-, Lüftungs- und Sanitärbereich.

## Features

- Responsive Design
- Dynamische Inhalte aus Supabase
- Projekte, Stellenanzeigen und Team-Mitglieder werden aus der Datenbank geladen
- Moderne Animationen mit Framer Motion
- TypeScript & React

## Setup

### 1. Dependencies installieren

```bash
npm install
```

### 2. Supabase konfigurieren

**Wichtig:** Um die Supabase-Integration zu nutzen, müssen Sie Ihre Supabase-Credentials konfigurieren.

Öffnen Sie `src/lib/supabase.ts` und ersetzen Sie die Platzhalter:

```typescript
export const supabase = createClient(
  'https://your-project.supabase.co',  // Ihre Supabase URL
  'your-anon-key'                       // Ihr Supabase Anon Key
);
```

### 3. Datenbank-Tabellen erstellen

Führen Sie folgende SQL-Befehle in Ihrem Supabase SQL Editor aus:

```sql
-- Projekte Tabelle
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  year TEXT NOT NULL,
  details TEXT[],
  challenges TEXT,
  solution TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Stellenanzeigen Tabelle
CREATE TABLE job_positions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  responsibilities TEXT[],
  requirements TEXT[],
  benefits TEXT[],
  salary TEXT,
  start_date TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team-Mitglieder Tabelle
CREATE TABLE team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  image TEXT NOT NULL,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leistungen Tabelle
CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  image TEXT NOT NULL,
  details TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security aktivieren
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Policies für öffentlichen Lesezugriff
CREATE POLICY "Allow public read access on projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access on job_positions" ON job_positions FOR SELECT USING (true);
CREATE POLICY "Allow public read access on team_members" ON team_members FOR SELECT USING (true);
CREATE POLICY "Allow public read access on services" ON services FOR SELECT USING (true);
```

### 4. Beispieldaten einfügen (optional)

```sql
-- Beispiel-Projekt
INSERT INTO projects (title, location, description, image, category, year, details, challenges, solution)
VALUES (
  'Bürokomplex Berlin Mitte',
  'Berlin',
  'Komplette HLS-Planung für modernes Bürogebäude mit 5.000 m²',
  'https://c.animaapp.com/mlqcq0lzeGbSwA/img/ai_7.png',
  'Gewerbe',
  '2023',
  ARRAY['Fläche: 5.000 m²', 'Energieeffizienzklasse: A+', 'Wärmepumpen-System mit Erdwärme'],
  'Die Herausforderung bestand darin, ein energieeffizientes System zu entwickeln.',
  'Durch den Einsatz einer Wärmepumpe konnten wir eine Energieeinsparung von 40% erreichen.'
);

-- Beispiel-Stellenanzeige
INSERT INTO job_positions (title, location, type, description, responsibilities, requirements, benefits, salary, start_date)
VALUES (
  'Projektingenieur HLS (m/w/d)',
  'Berlin',
  'Vollzeit',
  'Wir suchen einen erfahrenen Projektingenieur für die Planung und Umsetzung von HLS-Projekten.',
  ARRAY['Eigenverantwortliche Planung und Projektierung von HLS-Anlagen', 'Technische Leitung von Projekten', 'Koordination mit Architekten und Fachplanern'],
  ARRAY['Abgeschlossenes Studium im Bereich Versorgungstechnik', 'Mehrjährige Berufserfahrung in der HLS-Planung', 'Fundierte Kenntnisse in CAD-Software'],
  ARRAY['Attraktives Gehalt', 'Flexible Arbeitszeiten', 'Weiterbildungsmöglichkeiten'],
  '55.000 - 75.000 € p.a.',
  'Ab sofort oder nach Vereinbarung'
);

-- Beispiel-Leistung
INSERT INTO services (title, description, icon, image, details)
VALUES (
  'Heizung',
  'Moderne Heizsysteme für optimale Energieeffizienz und Komfort.',
  'Flame',
  'https://c.animaapp.com/mlqcq0lzeGbSwA/img/ai_3.png',
  ARRAY['Planung und Installation von Heizungsanlagen', 'Wärmepumpen und Solarthermie', 'Brennwerttechnik und Hybridheizungen', 'Wartung und Optimierung bestehender Systeme']
);
```

### 5. Development Server starten

```bash
npm run dev
```

Die Website ist dann unter [http://localhost:5173/](http://localhost:5173/) erreichbar.

## Projekt-Struktur

- `/src/pages` - Alle Seiten (Home, Leistungen, Projekte, etc.)
- `/src/components` - Wiederverwendbare Komponenten
- `/src/lib` - Utility-Funktionen und Supabase-Client
- `/src/components/ui` - UI-Komponenten (Buttons, Cards, etc.)

## Datenbank-Schema

### projects
- `id` - UUID (Primary Key)
- `title` - Projekttitel
- `location` - Standort
- `description` - Beschreibung
- `image` - Bild-URL
- `category` - Kategorie (Gewerbe, Wohnbau, Industrie, etc.)
- `year` - Jahr
- `details` - Array von Details
- `challenges` - Herausforderungen
- `solution` - Lösung

### job_positions
- `id` - UUID (Primary Key)
- `title` - Stellentitel
- `location` - Standort
- `type` - Typ (Vollzeit, Teilzeit, Ausbildung)
- `description` - Beschreibung
- `responsibilities` - Array von Aufgaben
- `requirements` - Array von Anforderungen
- `benefits` - Array von Benefits
- `salary` - Gehaltsangabe
- `start_date` - Startdatum

### team_members
- `id` - UUID (Primary Key)
- `name` - Name
- `position` - Position
- `image` - Bild-URL
- `bio` - Biografie

### services
- `id` - UUID (Primary Key)
- `title` - Titel der Leistung
- `description` - Kurzbeschreibung
- `icon` - Icon-Name (Flame, Wind, Droplet, Zap)
- `image` - Bild-URL
- `details` - Array von Details

## Admin Panel

Die Website verfügt über ein vollständiges Admin-Panel zur Verwaltung aller Inhalte.

### Zugriff auf das Admin-Panel

1. Navigieren Sie zu `/admin/login`
2. Melden Sie sich mit Ihren Supabase-Credentials an
3. Nach erfolgreicher Anmeldung werden Sie zum Dashboard weitergeleitet

### Admin-Funktionen

- **Projekte verwalten**: Erstellen, bearbeiten und löschen Sie Projekte
- **Stellenanzeigen verwalten**: Verwalten Sie alle offenen Stellen
- **Leistungen verwalten**: Bearbeiten Sie die angebotenen Leistungen
- **Team verwalten**: Fügen Sie Team-Mitglieder hinzu oder bearbeiten Sie diese

### Supabase Authentication einrichten

Um das Admin-Panel zu nutzen, müssen Sie die Supabase Authentication aktivieren:

1. Gehen Sie zu Ihrem Supabase-Projekt
2. Navigieren Sie zu "Authentication" > "Providers"
3. Aktivieren Sie "Email" als Provider
4. Erstellen Sie einen Admin-Benutzer unter "Authentication" > "Users"

### Row Level Security (RLS) Policies für Admin

Fügen Sie folgende Policies hinzu, um Admin-Zugriff zu ermöglichen:

```sql
-- Policies für Admin-Schreibzugriff auf projects
CREATE POLICY "Allow authenticated users to insert projects" ON projects FOR INSERT TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to update projects" ON projects FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to delete projects" ON projects FOR DELETE TO authenticated USING (true);

-- Policies für Admin-Schreibzugriff auf job_positions
CREATE POLICY "Allow authenticated users to insert job_positions" ON job_positions FOR INSERT TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to update job_positions" ON job_positions FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to delete job_positions" ON job_positions FOR DELETE TO authenticated USING (true);

-- Policies für Admin-Schreibzugriff auf services
CREATE POLICY "Allow authenticated users to insert services" ON services FOR INSERT TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to update services" ON services FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to delete services" ON services FOR DELETE TO authenticated USING (true);

-- Policies für Admin-Schreibzugriff auf team_members
CREATE POLICY "Allow authenticated users to insert team_members" ON team_members FOR INSERT TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to update team_members" ON team_members FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to delete team_members" ON team_members FOR DELETE TO authenticated USING (true);
```

## Hinweis zur Supabase-Integration

Die Website ist so konfiguriert, dass sie auch ohne Supabase-Verbindung funktioniert. Wenn keine Daten aus der Datenbank geladen werden können, werden Mock-Daten angezeigt. Um die volle Funktionalität inkl. Admin-Panel zu nutzen, konfigurieren Sie bitte Ihre Supabase-Credentials wie oben beschrieben.

## Build für Production

```bash
npm run build
```
