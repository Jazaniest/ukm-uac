//eslint-disable-next-line
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award, BadgeCheck, Star } from "lucide-react";
import { muriRecords } from "../data/data";

export default function MuriRecord() {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section id="muri" className="relative py-24 overflow-hidden bg-gray-900" ref={ref}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 w-150 h-150 bg-yellow-500/5 blur-3xl" />
      </div>

      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header with animated entrance */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 border rounded-full bg-yellow-500/10 border-yellow-500/30">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-bold tracking-widest text-yellow-400 uppercase">Museum Rekor Indonesia</span>
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
          </div>
          <h2 className="mt-2 mb-4 text-4xl font-black text-white sm:text-5xl">Rekor MURI</h2>
          <div className="w-16 h-1 mx-auto mb-6 bg-yellow-500" />
          <p className="max-w-xl mx-auto text-gray-400">Pencapaian luar biasa yang diakui secara resmi oleh Museum Rekor Indonesia.</p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {muriRecords.map((record, i) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.15, type: "spring", stiffness: 80 }}
              className="relative p-8 overflow-hidden transition-all bg-gray-800 border rounded-3xl border-yellow-500/30 hover:border-yellow-500/60 group"
            >
              {/* Corner decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 transition-colors translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500/5 group-hover:bg-yellow-500/10" />

              <div className="flex items-start gap-4 mb-5">
                <div className="flex items-center justify-center bg-yellow-500 shadow-lg shrink-0 w-14 h-14 rounded-2xl shadow-yellow-500/30">
                  <Award size={28} className="text-gray-950" />
                </div>
                <div>
                  <span className="text-xs font-bold tracking-widest uppercase text-yellow-500/70">Rekor MURI {record.year}</span>
                  <h3 className="mt-1 text-lg font-black leading-snug text-white">{record.record}</h3>
                </div>
              </div>

              <p className="mb-5 text-sm leading-relaxed text-gray-400">{record.detail}</p>

              <div className="flex items-center gap-2 bg-gray-700/50 rounded-xl px-4 py-2.5">
                <BadgeCheck size={16} className="text-yellow-400" />
                <span className="text-xs text-gray-400">Sertifikat:</span>
                <span className="font-mono text-xs font-semibold text-yellow-400">{record.certificate}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}