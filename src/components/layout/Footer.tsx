
'use client';

import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { Editable } from '@/components/inline-editing/Editable';

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4"><Editable contentKey="footer_about_title" /></h3>
            <p className="text-sm">
              <Editable contentKey="footer_about_description" />
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4"><Editable contentKey="footer_links_title" /></h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-primary transition-colors"><Editable contentKey="footer_link_about" /></Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors"><Editable contentKey="footer_link_contact" /></Link></li>
              <li><Link to="/products" className="hover:text-primary transition-colors"><Editable contentKey="footer_link_products" /></Link></li>
              <li><Link to="/guarantee" className="hover:text-primary transition-colors"><Editable contentKey="footer_link_guarantee" /></Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
             <h3 className="text-lg font-bold mb-4"><Editable contentKey="footer_contact_title" /></h3>
            <address className="text-sm not-italic space-y-2">
               <p><Editable contentKey="footer_contact_address" /></p>
               <p>Email: <a href="mailto:info@arvandmarket.com" className="hover:text-primary"><Editable contentKey="footer_contact_email" /></a></p>
               <p>Phone: <a href="tel:+98123456789" className="hover:text-primary"><Editable contentKey="footer_contact_phone" /></a></p>
            </address>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-4"><Editable contentKey="footer_social_title" /></h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Instagram size={20} /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-6 text-center text-sm">
          <p>
            <Editable contentKey="footer_copyright" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
