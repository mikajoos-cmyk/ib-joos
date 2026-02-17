import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import LeistungenSection from '../components/LeistungenSection';
import ProjekteSection from '../components/ProjekteSection';
import KarriereSection from '../components/KarriereSection';
import KontaktSection from '../components/KontaktSection';

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToLeistungen = () => {
    const element = document.getElementById('leistungen');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection onCtaClick={scrollToLeistungen} />
        <AboutSection />
        <LeistungenSection />
        <ProjekteSection />
        <KarriereSection />
        <KontaktSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;