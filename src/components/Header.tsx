import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Leistungen', path: '/leistungen' },
    { label: 'Projekte', path: '/projekte' },
    { label: 'Über uns', path: '/ueber-uns' },
    { label: 'Karriere', path: '/karriere' },
    { label: 'Kontakt', path: '/kontakt' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? 'bg-neutral shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-8 lg:px-16">
        <div className="flex items-center justify-between h-20 lg:h-24">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">HLS Engineering</span>
          </Link>

          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList className="flex gap-2">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.path}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={item.path}
                      className={`px-4 py-2 text-base font-normal transition-colors duration-200 ease-in-out cursor-pointer ${
                        isActive(item.path)
                          ? 'text-primary font-medium'
                          : 'text-gray-700 hover:text-primary'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-gray-900 hover:text-primary hover:bg-transparent"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={32} strokeWidth={1.5} /> : <Menu size={32} strokeWidth={1.5} />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-neutral border-t border-border">
          <NavigationMenu className="w-full">
            <NavigationMenuList className="flex flex-col w-full p-8 gap-4">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.path} className="w-full">
                  <NavigationMenuLink asChild>
                    <Link
                      to={item.path}
                      className={`block px-4 py-3 text-lg font-normal transition-colors duration-200 ease-in-out cursor-pointer ${
                        isActive(item.path)
                          ? 'text-primary font-medium'
                          : 'text-gray-700 hover:text-primary'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      )}
    </header>
  );
};

export default Header;