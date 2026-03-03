import { useState, useEffect } from "react";
import { Target, Menu, X } from "lucide-react";
import { navLinks } from "../data/data";
import uac from "../assets/uac.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (href) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-gray-950/95 backdrop-blur-sm shadow-lg shadow-yellow-500/10" : "bg-transparent"}`}>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => handleClick("#hero")} className="flex items-center gap-2 group">
            {/* <div className="flex items-center justify-center transition-colors bg-yellow-500 rounded-full w-9 h-9 group-hover:bg-yellow-400"> */}
              <img src={uac} alt="logo uac" className="object-contain w-15 h-15" />
            {/* </div> */}
            {/* <span className="text-lg font-bold tracking-wider">
              <span className="text-yellow-400">UAC</span>
            </span> */}
          </button>

          {/* Desktop Links */}
          <div className="items-center hidden gap-1 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className="px-3 py-2 text-sm text-gray-300 transition-colors rounded-md hover:text-yellow-400 hover:bg-white/5"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => handleClick("#registration")}
              className="px-4 py-2 text-sm font-semibold transition-colors bg-yellow-500 rounded-full text-gray-950 hover:bg-yellow-400"
            >
              Gabung Sekarang
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-300 transition-colors md:hidden hover:text-yellow-400"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-gray-800 md:hidden bg-gray-950/98 backdrop-blur-sm">
          <div className="flex flex-col gap-1 px-4 py-3">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className="text-left px-3 py-2.5 text-sm text-gray-300 hover:text-yellow-400 hover:bg-white/5 rounded-md transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleClick("#registration")}
              className="mt-2 px-4 py-2.5 bg-yellow-500 text-gray-950 font-semibold text-sm rounded-full hover:bg-yellow-400 transition-colors"
            >
              Gabung Sekarang
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}