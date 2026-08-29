import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Platzhalter = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block rounded border border-amber-400 bg-amber-100 px-1.5 py-0.5 text-sm font-medium text-amber-900">
    {children}
  </span>
);

const ImpressumPage = () => {
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
                Impressum
              </h1>
              <p className="text-gray-700 text-lg leading-relaxed">
                Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG) und § 18 Medienstaatsvertrag (MStV).
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-neutral">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-3xl mx-auto space-y-12">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Diensteanbieter</h2>
                <p className="text-gray-700 leading-relaxed">
                  Ingenieurbüro Joos GmbH Heizungs-Sanitär- und Klimatechnik
                  <br />
                  Burgstraße 19
                  <br />
                  72581 Dettingen an der Erms
                  <br />
                  Deutschland
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">
                  Vertretungsberechtigte Geschäftsführer
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Andreas Joos
                  <br />
                  Walter Joos
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Kontakt</h2>
                <p className="text-gray-700 leading-relaxed">
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
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Handelsregister</h2>
                <p className="text-gray-700 leading-relaxed">
                  Registergericht: Amtsgericht Stuttgart
                  <br />
                  Registernummer: HRB 361109
                  <br />
                  EU-Identifikationsnummer (EUID): DEB8534.HRB361109
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Steuernummer</h2>
                <p className="text-gray-700 leading-relaxed">
                  Steuernummer: 89078/18378
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">
                  Unternehmensgegenstand
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Planung, Konstruktion und Projektierung von Heizungs-, Sanitär- und Klimaanlagen
                  aller Art, sowie die Durchführung sämtlicher Ingenieur- und
                  Beratungsdienstleistungen in diesen Bereichen. Desweiteren die Bauüberwachung, die
                  Bauleitung, die Abnahmen und Abrechnungen dieser Gewerke.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">
                  Berufsrechtliche Angaben
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Gesetzliche Berufsbezeichnung:{' '}
                    <Platzhalter>
                      TODO: prüfen – z. B. „Beratender Ingenieur" bzw. „Ingenieur", verliehen in der
                      Bundesrepublik Deutschland
                    </Platzhalter>
                  </p>
                  <p>
                    Zuständige Kammer:{' '}
                    <Platzhalter>
                      TODO: bestätigen – Ingenieurkammer Baden-Württemberg, Zellerstraße 26, 70180
                      Stuttgart, www.ingbw.de
                    </Platzhalter>
                  </p>
                  <p>
                    Berufsrechtliche Regelungen:{' '}
                    <Platzhalter>
                      TODO: bestätigen – Ingenieurkammergesetz Baden-Württemberg (IngKammerG),
                      Ingenieurgesetz Baden-Württemberg (IngG); einsehbar unter www.landesrecht-bw.de
                    </Platzhalter>
                  </p>
                  <p>
                    Berufshaftpflichtversicherung:
                    <br />
                    Name und Sitz des Versicherers:{' '}
                    <Platzhalter>TODO: Versicherer und Anschrift eintragen</Platzhalter>
                    <br />
                    Räumlicher Geltungsbereich der Versicherung:{' '}
                    <Platzhalter>TODO: z. B. Deutschland / Europäische Union</Platzhalter>
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">
                  Redaktionell verantwortlich (§ 18 Abs. 2 MStV)
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Andreas Joos, Walter Joos
                  <br />
                  Ingenieurbüro Joos GmbH Heizungs-Sanitär- und Klimatechnik
                  <br />
                  Burgstraße 19, 72581 Dettingen an der Erms
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">
                  Verbraucherstreitbeilegung / Universalschlichtungsstelle
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor
                  einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Haftung für Inhalte</h2>
                <p className="text-gray-700 leading-relaxed">
                  Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen
                  Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir
                  als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte
                  fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
                  rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der
                  Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
                  Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer
                  konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
                  Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Haftung für Links</h2>
                <p className="text-gray-700 leading-relaxed">
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir
                  keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine
                  Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
                  Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum
                  Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige
                  Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente
                  inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte
                  einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen
                  werden wir derartige Links umgehend entfernen.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Urheberrecht</h2>
                <p className="text-gray-700 leading-relaxed">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
                  unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
                  Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
                  bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                  Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen
                  Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber
                  erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden
                  Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
                  Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden
                  Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte
                  umgehend entfernen.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ImpressumPage;
