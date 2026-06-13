
'use client';

import { Link } from 'react-router-dom';
import { Menu, Search, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Editable } from '@/components/inline-editing/Editable';

const navLinks = [
  { to: "/", key: "home", label: <Editable contentKey="nav_home" /> },
  { to: "/products", key: "products", label: <Editable contentKey="nav_products" /> },
  { to: "/guarantee", key: "guarantee", label: <Editable contentKey="nav_guarantee" /> },
  { to: "/repair", key: "repair", label: <Editable contentKey="nav_repair" /> },
  { to: "/contact", key: "contact", label: <Editable contentKey="nav_contact" /> },
  { to: "/about", key: "about", label: <Editable contentKey="nav_about" /> },
  { to: "/representatives", key: "representatives", label: <Editable contentKey="nav_representatives" /> },
];

const Header = () => {

  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-3/4">
              <nav className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link to={link.to} key={link.key} className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                   {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
           <Link
             to="/"
             className="text-4xl font-extrabold text-primary tracking-tight"
             style={{
               textShadow:
                 '1px 1px 0px rgba(0,0,0,0.18), 2px 2px 0px rgba(0,0,0,0.12), 3px 3px 0px rgba(0,0,0,0.07)',
             }}
           >
             <Editable contentKey="site_logo_text" as="span" />
           </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link to={link.to} key={link.key} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <ShoppingBag className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
