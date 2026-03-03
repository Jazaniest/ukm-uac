//eslint-disable-next-line
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BookOpen, Users, Target, Award } from "lucide-react";

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const cards = [
    { icon: Target, title: "Visi", desc: "Menjadi klub panahan mahasiswa terbaik di Sumatera yang melahirkan atlet berprestasi nasional dan internasional." },
    { icon: BookOpen, title: "Misi", desc: "Membina atlet secara profesional, membangun karakter disiplin dan fokus, serta aktif berpartisipasi dalam berbagai kejuaraan." },
    { icon: Users, title: "Komunitas", desc: "Membangun ekosistem panahan yang inklusif, mendukung pertumbuhan setiap anggota dari pemula hingga atlet elit." },
    { icon: Award, title: "Prestasi", desc: "Konsisten meraih podium di tingkat daerah, provinsi, dan nasional sejak berdiri pada tahun 2016." },
  ];

  return (
    <section id="about" className="py-24 bg-gray-900" ref={ref}>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-bold tracking-widest text-yellow-400 uppercase">Tentang Kami</span>
          <h2 className="mt-2 mb-4 text-4xl font-black text-white sm:text-5xl">Sejarah UAC</h2>
          <div className="w-16 h-1 mx-auto mb-6 bg-yellow-500" />
          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-400">
            UAC (Unilak Archery Club) adalah Unit Kegiatan Mahasiswa di bidang olahraga panahan yang bernaung di bawah Universitas Lancang Kuning, Pekanbaru. Didirikan pada tahun 2016, UAC telah berkembang menjadi salah satu klub panahan mahasiswa paling aktif dan berprestasi di Provinsi Riau. Dengan lebih dari 150 anggota aktif, UAC secara rutin mengadakan latihan, mengikuti kejuaraan tingkat regional hingga nasional, serta menyelenggarakan event-event yang memperkenalkan olahraga panahan kepada masyarakat luas.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="p-6 transition-all bg-gray-800 border border-gray-700 rounded-2xl hover:border-yellow-500/50 hover:bg-gray-750 group"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 transition-colors bg-yellow-500/10 rounded-xl group-hover:bg-yellow-500/20">
                <card.icon size={24} className="text-yellow-400" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">{card.title}</h3>
              <p className="text-sm leading-relaxed text-gray-400">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}