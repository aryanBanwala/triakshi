import { Gem, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const footerLinks = {
    company: [
      { name: "About Us", href: "#" },
      { name: "Our Story", href: "#" },
      { name: "Certifications", href: "#" },
      { name: "Blog", href: "#" }
    ],
    products: [
      { name: "Gemstones", href: "#" },
      { name: "Rudraksh", href: "#" },
      { name: "Lucky Store", href: "#" },
      { name: "Health Calculator", href: "#" }
    ],
    support: [
      { name: "Contact Us", href: "#" },
      { name: "Size Guide", href: "#" },
      { name: "Care Instructions", href: "#" },
      { name: "Returns & Exchange", href: "#" }
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Shipping Policy", href: "#" },
      { name: "Refund Policy", href: "#" }
    ]
  };

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "YouTube", icon: Youtube, href: "#" }
  ];

  return (
    <footer className="bg-gradient-to-br from-primary to-primary-light text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Stay Connected with Triyakshi Gems
            </h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Get exclusive offers, spiritual insights, and gemstone guidance delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-l-xl sm:rounded-r-none rounded-r-xl bg-white/10 border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <Button className="btn-hero mt-2 sm:mt-0 sm:rounded-l-none">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-gold p-2 rounded-xl">
                <Gem className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">
                Triyakshi Gems
              </span>
            </div>
            
            <p className="text-white/80 mb-6 leading-relaxed">
              For over 25 years, we've been India's trusted source for authentic gemstones, 
              spiritual accessories, and personalized astrological guidance.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gold" />
                <span className="text-white/80">123 Gem Street, Mumbai, India</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gold" />
                <span className="text-white/80">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gold" />
                <span className="text-white/80">info@triyakshigems.com</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-gold transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-gold transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-gold transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-gold transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Certifications */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Social Media */}
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <span className="text-white/80 text-sm">Follow us:</span>
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="bg-white/10 hover:bg-gold transition-colors duration-300 p-2 rounded-full"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>

            {/* Certifications */}
            <div className="flex items-center space-x-4 text-xs text-white/60">
              <span>Certified by GIA</span>
              <span>•</span>
              <span>Trusted by 10K+ Customers</span>
              <span>•</span>
              <span>25+ Years Experience</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-white/60">
            <p>© 2024 Triyakshi Gems. All rights reserved.</p>
            <p>Made with ❤️ for spiritual wellness</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;