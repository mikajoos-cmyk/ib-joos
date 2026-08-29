import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Platzhalter = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block rounded border border-amber-400 bg-amber-100 px-1.5 py-0.5 text-sm font-medium text-amber-900">
    {children}
  </span>
);

const Abschnitt = ({ titel, children }: { titel: string; children: React.ReactNode }) => (
  <div>
    <h2 className="text-2xl font-bold mb-4 text-gray-900">{titel}</h2>
    <div className="space-y-4 text-gray-700 leading-relaxed">{children}</div>
  </div>
);

const DatenschutzPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                Datenschutzerklärung
              </h1>
              <p className="text-gray-700 text-lg leading-relaxed">
                Informationen zur Verarbeitung personenbezogener Daten gemäß Art. 13, 14 DSGVO.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-neutral">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-3xl mx-auto space-y-12">
              <div className="rounded-md border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
                <strong>Hinweis für den Betreiber:</strong> Diese Datenschutzerklärung ist eine
                sorgfältig erstellte Vorlage auf Basis der auf dieser Website tatsächlich
                eingesetzten Dienste. Sie ersetzt keine anwaltliche Prüfung. Bitte gelb markierte
                Platzhalter ausfüllen und die Angaben vor Veröffentlichung durch eine fachkundige
                Stelle (z. B. Rechtsanwalt / Datenschutzbeauftragter) prüfen lassen.
              </div>

              <Abschnitt titel="1. Verantwortlicher">
                <p>
                  Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) und anderer
                  nationaler Datenschutzgesetze der Mitgliedstaaten sowie sonstiger
                  datenschutzrechtlicher Bestimmungen ist:
                </p>
                <p>
                  Ingenieurbüro Joos GmbH Heizungs-Sanitär- und Klimatechnik
                  <br />
                  Burgstraße 19
                  <br />
                  72581 Dettingen an der Erms
                  <br />
                  Deutschland
                  <br />
                  <br />
                  Vertreten durch die Geschäftsführer: Andreas Joos, Walter Joos
                  <br />
                  Telefon:{' '}
                  <a
                    href="tel:0049712388261"
                    className="text-primary hover:text-secondary transition-colors duration-200"
                  >
                    +49 7123 88261
                  </a>
                  <br />
                  E-Mail:{' '}
                  <a
                    href="mailto:info@ib-joos-gmbh.de"
                    className="text-primary hover:text-secondary transition-colors duration-200"
                  >
                    info@ib-joos-gmbh.de
                  </a>
                </p>
              </Abschnitt>

              <Abschnitt titel="2. Datenschutzbeauftragter">
                <p>
                  <Platzhalter>
                    TODO: Zutreffendes wählen – Ein Datenschutzbeauftragter ist gesetzlich nicht
                    bestellt, da die Voraussetzungen des Art. 37 DSGVO / § 38 BDSG nicht vorliegen.
                    ODER: Unser Datenschutzbeauftragter ist [Name, Anschrift, E-Mail].
                  </Platzhalter>
                </p>
              </Abschnitt>

              <Abschnitt titel="3. Allgemeines zur Datenverarbeitung">
                <p>
                  Wir verarbeiten personenbezogene Daten unserer Nutzer grundsätzlich nur, soweit
                  dies zur Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und
                  Leistungen erforderlich ist. Die Verarbeitung erfolgt regelmäßig nur nach
                  Einwilligung des Nutzers oder wenn eine Rechtsgrundlage dies gestattet.
                </p>
                <p>
                  <strong>Rechtsgrundlagen:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung),
                  Art. 6 Abs. 1 lit. b DSGVO (Vertrag / vorvertragliche Maßnahmen), Art. 6 Abs. 1
                  lit. c DSGVO (rechtliche Verpflichtung) sowie Art. 6 Abs. 1 lit. f DSGVO
                  (berechtigtes Interesse). Für den Zugriff auf Informationen im Endgerät des
                  Nutzers bzw. das Speichern von Informationen darauf gilt zusätzlich § 25 TDDDG.
                </p>
                <p>
                  <strong>Speicherdauer / Löschung:</strong> Die personenbezogenen Daten werden
                  gelöscht oder gesperrt, sobald der Zweck der Speicherung entfällt. Eine
                  Speicherung darüber hinaus erfolgt, wenn dies durch gesetzliche Aufbewahrungs­fristen
                  (insbesondere aus HGB und AO, i. d. R. 6 bzw. 10 Jahre) vorgesehen ist.
                </p>
              </Abschnitt>

              <Abschnitt titel="4. Bereitstellung der Website und Server-Logfiles">
                <p>
                  Bei jedem Aufruf der Website erfasst das System automatisiert Daten und
                  Informationen des aufrufenden Endgeräts. Folgende Daten werden hierbei erhoben:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>IP-Adresse des anfragenden Rechners</li>
                  <li>Datum und Uhrzeit des Zugriffs</li>
                  <li>aufgerufene Seite / Datei sowie übertragene Datenmenge</li>
                  <li>Meldung, ob der Abruf erfolgreich war</li>
                  <li>verwendeter Browsertyp und dessen Version</li>
                  <li>Betriebssystem des Nutzers</li>
                  <li>zuvor besuchte Seite (Referrer)</li>
                </ul>
                <p>
                  Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse
                  besteht in der technischen Bereitstellung, der Stabilität und der Sicherheit der
                  Website. Die Logfiles werden nach{' '}
                  <Platzhalter>TODO: Speicherdauer eintragen, z. B. 7 / 14 / 30 Tage</Platzhalter>{' '}
                  gelöscht, sofern keine sicherheitsrelevanten Ereignisse eine längere Speicherung
                  erfordern.
                </p>
              </Abschnitt>

              <Abschnitt titel="5. Hosting">
                <p>
                  Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die
                  personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den
                  Servern des Hosters gespeichert.
                </p>
                <p>
                  Hoster:{' '}
                  <Platzhalter>
                    TODO bestätigen: Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA
                    (Anschrift prüfen)
                  </Platzhalter>
                </p>
                <p>
                  Die Nutzung des Hosters erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO
                  (berechtigtes Interesse an einer sicheren und effizienten Bereitstellung unseres
                  Onlineangebots). Mit dem Hoster besteht ein Vertrag über Auftragsverarbeitung
                  (Art. 28 DSGVO):{' '}
                  <Platzhalter>TODO: Abschluss des AV-Vertrags bestätigen</Platzhalter>. Eine
                  Übermittlung von Daten in die USA kann nicht ausgeschlossen werden; die
                  Übermittlung wird auf{' '}
                  <Platzhalter>
                    TODO: Grundlage angeben – EU-Standardvertragsklauseln und/oder EU-US Data
                    Privacy Framework
                  </Platzhalter>{' '}
                  gestützt.
                </p>
              </Abschnitt>

              <Abschnitt titel="6. Datenbank- und Backend-Dienst (Supabase)">
                <p>
                  Zur Speicherung von Inhalten (z. B. Leistungen, Projekte, Stellenangebote) sowie
                  der über das Kontaktformular übermittelten Anfragen und für die Authentifizierung
                  im internen Verwaltungsbereich nutzen wir den Dienst Supabase.
                </p>
                <p>
                  Anbieter:{' '}
                  <Platzhalter>
                    TODO bestätigen: Supabase, Inc., 970 Toa Payoh North #07-04, Singapore 318992 /
                    bzw. US-Anschrift – bitte aktuelle Angaben aus dem AV-Vertrag übernehmen
                  </Platzhalter>
                  . Serverstandort der Datenbank:{' '}
                  <Platzhalter>
                    TODO: Region eintragen (z. B. EU – Frankfurt / eu-central-1). Liegt die Region
                    außerhalb der EU, ist dies hier offenzulegen.
                  </Platzhalter>
                </p>
                <p>
                  Beim Aufruf der Website werden Anfragen an die Supabase-Server gesendet; dabei
                  wird die IP-Adresse des Nutzers verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1
                  lit. f DSGVO (berechtigtes Interesse am Betrieb der Website) sowie, soweit
                  Vertrags- oder Anfragedaten betroffen sind, Art. 6 Abs. 1 lit. b DSGVO. Mit dem
                  Anbieter besteht ein Auftragsverarbeitungsvertrag nach Art. 28 DSGVO:{' '}
                  <Platzhalter>TODO: Abschluss des AV-Vertrags bestätigen</Platzhalter>. Soweit
                  Daten in ein Drittland übermittelt werden, erfolgt dies auf Grundlage der
                  EU-Standardvertragsklauseln.
                </p>
              </Abschnitt>

              <Abschnitt titel="7. Kontaktformular und Kontaktaufnahme per E-Mail / Telefon">
                <p>
                  Auf unserer Website steht ein Kontaktformular zur Verfügung, das für die
                  elektronische Kontaktaufnahme genutzt werden kann. Nimmt ein Nutzer diese
                  Möglichkeit wahr, werden die in der Eingabemaske eingegebenen Daten an uns
                  übermittelt und gespeichert. Dies sind:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Name</li>
                  <li>E-Mail-Adresse</li>
                  <li>Telefonnummer (optional)</li>
                  <li>Betreff</li>
                  <li>Nachrichtentext</li>
                  <li>Datum und Uhrzeit der Übermittlung</li>
                </ul>
                <p>
                  Die Speicherung der Anfragen erfolgt in unserer bei Supabase gehosteten Datenbank
                  (siehe Ziffer 6). Alternativ ist eine Kontaktaufnahme über die bereitgestellte
                  E-Mail-Adresse oder telefonisch möglich; in diesem Fall werden die mit der
                  E-Mail bzw. dem Anruf übermittelten personenbezogenen Daten gespeichert.
                </p>
                <p>
                  Zweck der Verarbeitung ist die Bearbeitung der Kontaktanfrage. Rechtsgrundlage
                  ist Art. 6 Abs. 1 lit. b DSGVO, sofern die Anfrage auf den Abschluss oder die
                  Durchführung eines Vertrags gerichtet ist, im Übrigen Art. 6 Abs. 1 lit. f DSGVO
                  (berechtigtes Interesse an der Beantwortung von Anfragen).
                </p>
                <p>
                  Die Daten werden gelöscht, sobald sie für die Erreichung des Zwecks ihrer
                  Erhebung nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungsfristen
                  entgegenstehen, spätestens jedoch{' '}
                  <Platzhalter>
                    TODO: Frist eintragen, z. B. „nach Ablauf von 6 Monaten nach abschließender
                    Bearbeitung"
                  </Platzhalter>
                  .
                </p>
              </Abschnitt>

              <Abschnitt titel="8. Bewerbungen">
                <p>
                  Über das Kontaktformular sowie per E-Mail können Bewerbungen auf ausgeschriebene
                  Stellen übermittelt werden. Wir verarbeiten die übermittelten Bewerberdaten zur
                  Durchführung des Bewerbungsverfahrens. Rechtsgrundlage ist § 26 Abs. 1 BDSG
                  i. V. m. Art. 88 DSGVO sowie Art. 6 Abs. 1 lit. b DSGVO
                  (Anbahnung eines Beschäftigungsverhältnisses).
                </p>
                <p>
                  Kommt kein Beschäftigungsverhältnis zustande, werden die Bewerberdaten spätestens{' '}
                  <Platzhalter>
                    TODO: Frist bestätigen, üblich sind 6 Monate
                  </Platzhalter>{' '}
                  nach Abschluss des Bewerbungsverfahrens gelöscht, sofern der Löschung keine
                  gesetzlichen Vorschriften entgegenstehen oder die bewerbende Person in eine
                  längere Speicherung (z. B. Aufnahme in einen Bewerberpool) eingewilligt hat.
                </p>
              </Abschnitt>

              <Abschnitt titel="9. Karten-Einbindung: Google Maps">
                <p>
                  Auf der Kontaktseite binden wir Kartenmaterial des Dienstes Google Maps ein.
                  Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4,
                  Irland („Google").
                </p>
                <p>
                  Wir binden die Karte über eine sogenannte Zwei-Klick-Lösung ein: Beim Aufruf der
                  Kontaktseite wird zunächst nur ein Hinweisfeld angezeigt; eine Verbindung zu
                  Google besteht zu diesem Zeitpunkt nicht. Erst wenn Sie aktiv auf die
                  Schaltfläche „Google Maps laden" klicken, wird die interaktive Karte nachgeladen
                  und eine Verbindung zu den Servern von Google hergestellt. Dabei wird u. a. Ihre
                  IP-Adresse an Google übertragen; eine Übermittlung in die USA findet statt. Die
                  weitere Verarbeitung durch Google erfolgt nach dessen Datenschutzerklärung.
                </p>
                <p>
                  Rechtsgrundlage für das Laden der Karte ist Ihre Einwilligung gemäß Art. 6 Abs. 1
                  lit. a DSGVO und § 25 Abs. 1 TDDDG. Die Erteilung der Einwilligung ist freiwillig
                  und kann jederzeit mit Wirkung für die Zukunft widerrufen werden. Setzen Sie das
                  Häkchen „Meine Auswahl für zukünftige Besuche merken", speichern wir Ihre
                  Einwilligung im lokalen Speicher (Local Storage) Ihres Browsers unter dem
                  Schlüssel „ib-joos-maps-consent", damit die Karte bei weiteren Besuchen ohne
                  erneute Nachfrage angezeigt wird. Zum Widerruf löschen Sie die Website-Daten
                  bzw. den Local Storage in Ihren Browser-Einstellungen.
                </p>
                <p>
                  Weitere Informationen:{' '}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-secondary transition-colors duration-200"
                  >
                    https://policies.google.com/privacy
                  </a>
                  .
                </p>
              </Abschnitt>

              <Abschnitt titel="10. Schriftarten (Web Fonts)">
                <p>
                  Zur einheitlichen Darstellung verwendet diese Website die Schriftfamilien
                  „IBM Plex Sans", „IBM Plex Mono" und „Lato". Die Schriftdateien sind lokal auf
                  unserem Server hinterlegt und werden ausschließlich von dort geladen. Eine
                  Verbindung zu Servern Dritter – insbesondere zu Google Fonts – wird dabei nicht
                  aufgebaut; es werden keine personenbezogenen Daten (insbesondere keine
                  IP-Adressen) an Dritte übermittelt.
                </p>
              </Abschnitt>

              <Abschnitt titel="11. Einbindung von Medien über ein externes CDN">
                <p>
                  Bilder und Videos auf dieser Website werden teilweise über das Content-Delivery-
                  Network „animaapp.com" (c.animaapp.com) ausgeliefert. Beim Abruf dieser Inhalte
                  wird Ihre IP-Adresse an den CDN-Anbieter übertragen, damit die Inhalte an Ihren
                  Browser ausgeliefert werden können. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
                  DSGVO (berechtigtes Interesse an einer schnellen und zuverlässigen Auslieferung
                  der Website-Inhalte).
                </p>
                <p>
                  <Platzhalter>
                    TODO: Prüfen, ob diese Medien dauerhaft über das externe CDN geladen werden
                    sollen oder auf das eigene Hosting übernommen werden. Ggf. Anbieter, Anschrift
                    und AV-Vertrag ergänzen.
                  </Platzhalter>
                </p>
              </Abschnitt>

              <Abschnitt titel="12. Cookies und vergleichbare Technologien">
                <p>
                  Für den Betrieb der öffentlich zugänglichen Seiten setzen wir keine Analyse-,
                  Tracking- oder Marketing-Cookies ein. Technisch notwendige lokale Speicher werden
                  nur im internen Verwaltungsbereich (Login) zur Aufrechterhaltung der Sitzung
                  verwendet; Rechtsgrundlage hierfür ist § 25 Abs. 2 Nr. 2 TDDDG i. V. m. Art. 6
                  Abs. 1 lit. f DSGVO.
                </p>
                <p>
                  Durch die Einbindung von Google Maps können beim Laden der Karte Cookies bzw.
                  vergleichbare Technologien von Google gesetzt werden (siehe Ziffer 9).
                </p>
              </Abschnitt>

              <Abschnitt titel="13. Rechte der betroffenen Person">
                <p>Ihnen stehen im Hinblick auf Ihre personenbezogenen Daten folgende Rechte zu:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
                  <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
                  <li>Recht auf Löschung (Art. 17 DSGVO)</li>
                  <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                  <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
                  <li>Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
                  <li>
                    Recht auf Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft
                    (Art. 7 Abs. 3 DSGVO)
                  </li>
                </ul>
                <p>
                  Zur Ausübung Ihrer Rechte genügt eine formlose Mitteilung an die unter Ziffer 1
                  genannten Kontaktdaten.
                </p>
                <p>
                  <strong>Beschwerderecht bei der Aufsichtsbehörde:</strong> Unbeschadet eines
                  anderweitigen verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs steht Ihnen
                  das Recht auf Beschwerde bei einer Aufsichtsbehörde zu (Art. 77 DSGVO). Die für
                  uns zuständige Aufsichtsbehörde ist:
                </p>
                <p>
                  Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit
                  Baden-Württemberg
                  <br />
                  Lautenschlagerstraße 20, 70173 Stuttgart
                  <br />
                  <a
                    href="https://www.baden-wuerttemberg.datenschutz.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-secondary transition-colors duration-200"
                  >
                    www.baden-wuerttemberg.datenschutz.de
                  </a>
                </p>
              </Abschnitt>

              <Abschnitt titel="14. Widerspruchsrecht (Art. 21 DSGVO)">
                <p>
                  Sofern Ihre personenbezogenen Daten auf Grundlage von berechtigten Interessen
                  gemäß Art. 6 Abs. 1 lit. f DSGVO verarbeitet werden, haben Sie das Recht, aus
                  Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit Widerspruch
                  gegen diese Verarbeitung einzulegen. Legen Sie Widerspruch ein, werden wir Ihre
                  personenbezogenen Daten nicht mehr verarbeiten, es sei denn, wir können
                  zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre
                  Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der
                  Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.
                </p>
              </Abschnitt>

              <Abschnitt titel="15. Datensicherheit">
                <p>
                  Wir verwenden innerhalb des Website-Besuchs das verbreitete TLS-Verfahren
                  (Transport Layer Security) in Verbindung mit der jeweils höchsten
                  Verschlüsselungsstufe, die von Ihrem Browser unterstützt wird. Eine verschlüsselte
                  Verbindung erkennen Sie an der Adresszeile „https://" und dem Schloss-Symbol in
                  Ihrer Browserzeile.
                </p>
              </Abschnitt>

              <Abschnitt titel="16. Aktualität und Änderung dieser Datenschutzerklärung">
                <p>
                  Diese Datenschutzerklärung hat den Stand{' '}
                  <Platzhalter>TODO: Monat/Jahr der Veröffentlichung, z. B. „August 2026"</Platzhalter>
                  . Durch die Weiterentwicklung unserer Website oder aufgrund geänderter
                  gesetzlicher bzw. behördlicher Vorgaben kann es notwendig werden, diese
                  Datenschutzerklärung anzupassen. Die jeweils aktuelle Fassung kann jederzeit auf
                  dieser Seite abgerufen werden.
                </p>
              </Abschnitt>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DatenschutzPage;
