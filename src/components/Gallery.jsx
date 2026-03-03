//eslint-disable-next-line
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Image, Target, Users, Trophy, Zap } from "lucide-react";
import { galleryItems } from "../data/data";

const categoryIcon = { Latihan: Target, Prestasi: Trophy, Event: Zap, Tim: Users };
const placeholderColors = [
  "from-gray-800 to-gray-700",
  "from-yellow-900/60 to-gray-800",
  "from-gray-700 to-gray-800",
  "from-yellow-800/40 to-gray-900",
  "from-gray-800 to-gray-700",
  "from-gray-900 to-yellow-900/40",
];

export default function Gallery() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="gallery" className="py-24 bg-gray-950" ref={ref}>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-bold tracking-widest text-yellow-400 uppercase">Momen Berharga</span>
          <h2 className="mt-2 mb-4 text-4xl font-black text-white sm:text-5xl">Galeri UAC</h2>
          <div className="w-16 h-1 mx-auto mb-6 bg-yellow-500" />
          <p className="max-w-xl mx-auto text-gray-400">Sekilas pandang berbagai kegiatan, latihan, dan momen bersejarah UAC.</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {galleryItems.map((item, i) => {
            const Icon = categoryIcon[item.category] || Image;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative rounded-2xl overflow-hidden bg-linear-to-br ${placeholderColors[i]} aspect-video group cursor-pointer`}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Icon size={36} className="mb-2 text-white/20" />
                  <span className="text-xs font-semibold text-white/20">{item.category}</span>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-end transition-all duration-300 bg-yellow-500/0 group-hover:bg-yellow-500/10">
                  <div className="w-full p-4 transition-transform duration-300 translate-y-full bg-linear-to-t from-black/80 to-transparent group-hover:translate-y-0">
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <span className="text-xs text-yellow-400">{item.category}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}