//eslint-disable-next-line
import { motion } from "framer-motion";
import { Crosshair } from "lucide-react";
import { statsData } from "../data/data";

export default function Hero() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-gray-950"
    >
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-yellow-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 rounded-full w-96 h-96 bg-yellow-500/5 blur-3xl" />
      </div>

      <div className="relative max-w-4xl px-4 pt-24 pb-16 mx-auto text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          {/* <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-1.5 mb-6">
            <Crosshair size={14} className="text-yellow-400" />
            <span className="text-xs font-semibold tracking-widest text-yellow-400 uppercase">
              Unit Kegiatan Mahasiswa
            </span>
          </div> */}

          {/* Title */}
          <h1 className="mb-4 text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
            <span className="text-white">Unilak Archery Club</span>
            {/* <span className="text-yellow-400">A</span>
            <span className="text-white">C</span> */}
          </h1>

          <i className="mb-3 text-xl font-bold text-gray-300 sm:text-2xl">
            Yes We Can
          </i>

          {/* <p className="mb-2 text-3xl font-black text-white sm:text-4xl">
            Menembak Target,
          </p>
          <p className="mb-6 text-3xl font-black text-yellow-400 sm:text-4xl">
            Mengukir Prestasi.
          </p> */}

          <p className="max-w-2xl mx-auto mb-8 text-lg text-gray-400">
            Komunitas panahan mahasiswa Universitas Lancang Kuning yang
            berprestasi di tingkat regional dan nasional. Bergabunglah dan raih
            puncak bersama kami.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => scrollTo("#achievements")}
              className="py-3 font-bold transition-all bg-yellow-500 rounded-full shadow-lg px-7 text-gray-950 hover:bg-yellow-400 hover:scale-105 shadow-yellow-500/25"
            >
              Lihat Prestasi
            </button>

            <button
              onClick={() => scrollTo("#registration")}
              className="py-3 font-bold text-yellow-400 transition-all border-2 rounded-full px-7 border-yellow-500/50 hover:border-yellow-400 hover:bg-yellow-500/10"
            >
              Gabung Sekarang
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-3 gap-4 pt-10 mt-16 border-t border-gray-800 sm:grid-cols-3"
        >
          {statsData.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-black text-yellow-400 sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}