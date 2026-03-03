//eslint-disable-next-line
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Quote } from "lucide-react";
import { testimonialsData } from "../data/data";

export default function Testimonials() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="py-24 bg-gray-900" ref={ref}>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-bold tracking-widest text-yellow-400 uppercase">Suara Anggota</span>
          <h2 className="mt-2 mb-4 text-4xl font-black text-white sm:text-5xl">Testimoni</h2>
          <div className="w-16 h-1 mx-auto bg-yellow-500" />
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonialsData.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative transition-all bg-gray-800 border border-gray-700 rounded-2xl p-7 hover:border-yellow-500/40"
            >
              <Quote size={32} className="absolute text-yellow-500/20 top-6 right-6" />
              <p className="mb-6 text-sm italic leading-relaxed text-gray-300">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center text-sm font-bold text-yellow-400 border-2 rounded-full w-11 h-11 bg-yellow-500/10 border-yellow-500/30">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}