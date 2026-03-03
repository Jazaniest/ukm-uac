//eslint-disable-next-line
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { User } from "lucide-react";
import { managementData } from "../data/data";

const roleColors = {
  "Ketua Umum": "bg-yellow-500 text-gray-950",
  "Wakil Ketua": "bg-yellow-500/80 text-gray-950",
  default: "bg-gray-700 text-gray-300",
};

export default function Management() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const topTier = managementData.slice(0, 2);
  const secondTier = managementData.slice(2, 6);
  const rest = managementData.slice(6);

  const Card = ({ person, delay = 0, large = false }) => (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={`bg-gray-800 border border-gray-700 hover:border-yellow-500/40 rounded-2xl p-5 flex flex-col items-center text-center transition-all hover:bg-gray-750 group ${large ? "py-7" : ""}`}
    >
      <div className={`${large ? "w-20 h-20 text-2xl" : "w-14 h-14 text-lg"} bg-yellow-500/10 border-2 border-yellow-500/30 rounded-full flex items-center justify-center font-black text-yellow-400 group-hover:border-yellow-400 transition-colors mb-3`}>
        {person.initials}
      </div>
      <p className={`text-white font-bold ${large ? "text-base" : "text-sm"}`}>{person.name}</p>
      <span className={`mt-2 px-3 py-0.5 rounded-full text-xs font-semibold ${roleColors[person.role] || roleColors.default}`}>
        {person.role}
      </span>
    </motion.div>
  );

  return (
    <section id="management" className="py-24 bg-gray-950" ref={ref}>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-bold tracking-widest text-yellow-400 uppercase">Struktur Organisasi</span>
          <h2 className="mt-2 mb-4 text-4xl font-black text-white sm:text-5xl">Kepengurusan UAC</h2>
          <div className="w-16 h-1 mx-auto mb-6 bg-yellow-500" />
          <p className="max-w-xl mx-auto text-gray-400">Dikelola oleh mahasiswa aktif Unilak yang berdedikasi dan berpengalaman di bidang olahraga panahan.</p>
        </motion.div>

        {/* Top tier */}
        <div className="flex justify-center gap-6 mb-6">
          {topTier.map((p, i) => <div key={p.id} className="w-48"><Card person={p} delay={i * 0.1} large /></div>)}
        </div>
        {/* Second tier */}
        <div className="grid max-w-3xl grid-cols-2 gap-4 mx-auto mb-4 sm:grid-cols-4">
          {secondTier.map((p, i) => <Card key={p.id} person={p} delay={0.2 + i * 0.08} />)}
        </div>
        {/* Rest */}
        <div className="grid max-w-5xl grid-cols-2 gap-4 mx-auto sm:grid-cols-3 lg:grid-cols-6">
          {rest.map((p, i) => <Card key={p.id} person={p} delay={0.5 + i * 0.07} />)}
        </div>
      </div>
    </section>
  );
}