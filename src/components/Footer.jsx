import React from "react";

const Footer = () => {
  return (
    <footer className="py-12 bg-dark text-white/30 border-t border-white/5">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm font-medium">
          © 2026 FERREL RASHAD. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-8">
          {[
            { name: "LinkedIn", href: "https://www.linkedin.com/in/ferrel-rashad-8a165514b/" },
            { name: "GitHub", href: "https://github.com/FerrelHD" },
          ].map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
        <p className="text-sm font-medium">
          BUILT WITH <span className="text-white">REACT & FRAMER MOTION</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
