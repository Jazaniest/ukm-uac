// eslint-disable-next-line
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { orgData } from "../data/data";

/* ── Node card: konsisten dengan card style di Events ── */
const Node = ({ role, name, delay = 0, inView, wide = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay }}
    className={`overflow-hidden bg-gray-900 border border-gray-800 rounded-xl group hover:border-yellow-500/40 transition-all ${wide ? "w-64" : "w-44"}`}
  >
    <div className="h-1 transition-colors bg-linear-to-r from-yellow-500 to-yellow-600 group-hover:from-yellow-400" />
    <div className="px-4 py-3 text-center">
      <p className="text-[9px] font-bold tracking-widest text-yellow-400 uppercase mb-1">{role}</p>
      <p className="text-sm font-bold leading-snug text-white">{name}</p>
    </div>
  </motion.div>
);

/* ── Vertical connector ── */
const VLine = ({ h = 24 }) => (
  <div className="flex justify-center" style={{ height: h }}>
    <div className="w-px bg-gray-700" style={{ height: h }} />
  </div>
);

/* ── Sibling row with connectors ── */
//eslint-disable-next-line
const Row = ({ children, delay = 0, inView, spreadPct = "50%" }) => (
  <div className="relative flex flex-col items-center w-full">
    {/* horizontal crossbar */}
    <div
      className="h-px bg-gray-700"
      style={{ width: spreadPct, position: "relative" }}
    />
    <div className="flex justify-center w-full gap-5" style={{ marginTop: 0 }}>
      {children}
    </div>
  </div>
);

/* ── Per-child vertical drop ── */
const ChildDrop = ({ children }) => (
  <div className="flex flex-col items-center">
    <div className="w-px bg-gray-700" style={{ height: 24 }} />
    {children}
  </div>
);

/* ── Bidang card: sama persis pola dengan Events card ── */
const BidangCard = ({ data, delay = 0, inView }) => (
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay }}
    className="flex flex-col overflow-hidden transition-all bg-gray-900 border border-gray-800 rounded-2xl hover:border-yellow-500/40 group"
  >
    <div className="h-2 transition-colors bg-linear-to-r from-yellow-500 to-yellow-600 group-hover:from-yellow-400" />
    <div className="flex flex-col flex-1 p-5">
      <h3 className="mb-4 text-sm font-black leading-snug text-white">{data.title}</h3>

      <div className="mb-3">
        <p className="text-[9px] font-bold tracking-widest text-yellow-400 uppercase mb-1">Ketua Bidang</p>
        <p className="text-sm font-bold text-white">{data.ketua}</p>
      </div>

      <div>
        <p className="text-[9px] font-bold tracking-widest text-yellow-400 uppercase mb-2">Anggota</p>
        <div className="flex flex-wrap gap-1">
          {data.anggota.map((a, i) => (
            <span key={i} className="bg-gray-800 border border-gray-700 text-gray-400 text-[10px] font-medium px-2 py-0.5 rounded-full">
              {a}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

/* ─────────────────────── MAIN ─────────────────────── */
export default function Management() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="management" className="py-24 bg-gray-950" ref={ref}>
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">

        {/* ── Header — sama persis dengan Events ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-bold tracking-widest text-yellow-400 uppercase">Kepengurusan</span>
          <h2 className="mt-2 mb-4 text-4xl font-black text-white sm:text-5xl">Struktur Organisasi</h2>
          <div className="w-16 h-1 mx-auto mb-6 bg-yellow-500" />
          <p className="max-w-xl mx-auto text-gray-400">Dikelola oleh mahasiswa aktif Unilak yang berdedikasi dan berpengalaman di bidang olahraga panahan.</p>
        </motion.div>

        {/* ── ORG TREE ── */}
        <div className="flex flex-col items-center">

          {/* L1 — Penanggung Jawab */}
          <Node role={orgData.penanggungjawab.role} name={orgData.penanggungjawab.name} delay={0.1} inView={inView} wide />
          <VLine />

          {/* L2 — Penasihat (3 nodes) */}
          <Row spreadPct="52%">
            {orgData.penasihat.map((p, i) => (
              <ChildDrop key={i}>
                <Node role={p.role} name={p.name} delay={0.18 + i * 0.07} inView={inView} />
              </ChildDrop>
            ))}
          </Row>
          <VLine />

          {/* L3 — Pembina */}
          <Node role={orgData.pembina.role} name={orgData.pembina.name} delay={0.34} inView={inView} wide />
          <VLine />

          {/* L4 — Ketua, Sekretaris, Bendahara */}
          <Row spreadPct="48%">
            {orgData.inti.map((p, i) => (
              <ChildDrop key={i}>
                <Node role={p.role} name={p.name} delay={0.42 + i * 0.07} inView={inView} />
              </ChildDrop>
            ))}
          </Row>
          <VLine />

          {/* L5 — Kepala Pelatih */}
          <Node role={orgData.kepalaP.role} name={orgData.kepalaP.name} delay={0.57} inView={inView} wide />
          <VLine />

          {/* L6 — Pelatih */}
          <Row spreadPct="30%">
            {orgData.pelatih.map((p, i) => (
              <ChildDrop key={i}>
                <Node role={p.role} name={p.name} delay={0.64 + i * 0.08} inView={inView} />
              </ChildDrop>
            ))}
          </Row>

          {/* drop ke bidang */}
          <VLine h={28} />
          <div className="w-4/5 h-px bg-gray-700" />

          {/* L7 — Bidang */}
          <div className="grid w-full grid-cols-1 gap-5 mt-0 sm:grid-cols-2 xl:grid-cols-4">
            {orgData.bidang.map((b, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-px bg-gray-700" style={{ height: 24 }} />
                <BidangCard data={b} delay={0.76 + i * 0.09} inView={inView} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}