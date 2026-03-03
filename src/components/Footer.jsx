import { Target, Mail, Phone, MapPin, Instagram, Youtube, Facebook } from "lucide-react";
import { navLinks } from "../data/data";

export default function Footer() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-gray-800 bg-gray-950">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 mb-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center bg-yellow-500 rounded-full w-9 h-9">
                <Target size={18} className="text-gray-950" />
              </div>
              <span className="text-lg font-black tracking-wider text-white">
                <span className="text-yellow-400">U</span>AC
              </span>
            </div>
            <p className="mb-5 text-sm leading-relaxed text-gray-500">
              Unilak Archery Club — Komunitas panahan mahasiswa Universitas Lancang Kuning yang berprestasi tingkat nasional.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Youtube, href: "#", label: "YouTube" },
                { icon: Facebook, href: "#", label: "Facebook" },
                //eslint-disable-next-line
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="flex items-center justify-center transition-all bg-gray-800 border border-gray-700 rounded-lg w-9 h-9 hover:bg-yellow-500/20 hover:border-yellow-500/40 group"
                >
                  <Icon size={16} className="text-gray-400 transition-colors group-hover:text-yellow-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-bold tracking-wide text-white uppercase">Navigasi</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-gray-500 transition-colors hover:text-yellow-400"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h4 className="mb-4 text-sm font-bold tracking-wide text-white uppercase">Kontak</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-yellow-400 shrink-0 mt-0.5" />
                <p className="text-sm leading-relaxed text-gray-500">
                  Jl. Yos Sudarso KM. 8, Rumbai, Pekanbaru, Riau 28266<br />
                  Universitas Lancang Kuning
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-yellow-400 shrink-0" />
                <a href="mailto:uac@unilak.ac.id" className="text-sm text-gray-500 transition-colors hover:text-yellow-400">uac@unilak.ac.id</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-yellow-400 shrink-0" />
                <a href="tel:+6281234567890" className="text-sm text-gray-500 transition-colors hover:text-yellow-400">+62 812-3456-7890</a>
              </div>
              <div className="flex items-center gap-3">
                <Instagram size={16} className="text-yellow-400 shrink-0" />
                <a href="#" className="text-sm text-gray-500 transition-colors hover:text-yellow-400">@uac.unilak</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 pt-6 border-t border-gray-800 sm:flex-row">
          <p className="text-xs text-gray-600">© 2024 UAC – Unilak Archery Club. Hak Cipta Dilindungi.</p>
          <p className="text-xs text-gray-700">Universitas Lancang Kuning, Pekanbaru – Riau</p>
        </div>
      </div>
    </footer>
  );
}