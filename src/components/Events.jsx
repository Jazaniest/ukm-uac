//eslint-disable-next-line
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CalendarDays, MapPin, Tag } from "lucide-react";
import { eventsData } from "../data/data";

const typeColor = {
  Tournament: "bg-yellow-500/20 text-yellow-400",
  Nasional: "bg-blue-500/20 text-blue-400",
  Provinsi: "bg-green-500/20 text-green-400",
  Regional: "bg-purple-500/20 text-purple-400",
  Exhibition: "bg-pink-500/20 text-pink-400",
};

export default function Events() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="events" className="py-24 bg-gray-950" ref={ref}>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-bold tracking-widest text-yellow-400 uppercase">Jejak Langkah</span>
          <h2 className="mt-2 mb-4 text-4xl font-black text-white sm:text-5xl">Event yang Diikuti</h2>
          <div className="w-16 h-1 mx-auto mb-6 bg-yellow-500" />
          <p className="max-w-xl mx-auto text-gray-400">Berbagai ajang bergengsi yang telah diikuti UAC dari tingkat daerah hingga nasional.</p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {eventsData.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="overflow-hidden transition-all bg-gray-900 border border-gray-800 rounded-2xl hover:border-yellow-500/40 group"
            >
              {/* Card header */}
              <div className="h-2 transition-colors bg-linear-to-r from-yellow-500 to-yellow-600 group-hover:from-yellow-400" />
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${typeColor[event.type] || "bg-gray-700 text-gray-300"}`}>
                    {event.type}
                  </span>
                  <span className="text-xs font-bold text-gray-500">{event.year}</span>
                </div>
                <h3 className="mb-2 text-base font-bold leading-snug text-white">{event.name}</h3>
                <p className="mb-4 text-sm leading-relaxed text-gray-400">{event.description}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <MapPin size={12} className="text-yellow-500/70" />
                  <span>{event.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}