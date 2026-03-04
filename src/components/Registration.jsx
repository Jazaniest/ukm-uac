import { useState } from "react";
//eslint-disable-next-line
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CheckCircle, ArrowRight, Target } from "lucide-react";

const requirements = [
  "Mahasiswa aktif Universitas Lancang Kuning",
  "Bersedia mengikuti latihan rutin (2-3x seminggu)",
  "Tidak harus punya pengalaman panahan sebelumnya",
  "Berkomitmen dan disiplin dalam berlatih",
];

export default function Registration() {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });
  const [form, setForm] = useState({ name: "", nim: "", prodi: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.nim) return;
    setSubmitted(true);
  };

  return (
    <section id="registration" className="py-24 bg-gray-950" ref={ref}>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-bold tracking-widest text-yellow-400 uppercase">Bergabung</span>
          <h2 className="mt-2 mb-4 text-4xl font-black text-white sm:text-5xl">Pendaftaran Anggota</h2>
          <div className="w-16 h-1 mx-auto mb-6 bg-yellow-500" />
          <p className="max-w-xl mx-auto text-gray-400">Mulai perjalananmu bersama kami. Tidak perlu pengalaman — hanya butuh semangat dan komitmen!</p>
        </motion.div>

        <div className="grid items-start max-w-5xl gap-10 mx-auto lg:grid-cols-2">
          {/* Requirements */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h3 className="flex items-center gap-2 mb-6 text-xl font-bold text-white">
              <Target size={20} className="text-yellow-400" />
              Syarat Pendaftaran
            </h3>
            <div className="mb-8 space-y-3">
              {requirements.map((req, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-yellow-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-300">{req}</span>
                </div>
              ))}
            </div>
            <div className="p-5 border bg-yellow-500/10 border-yellow-500/30 rounded-2xl">
              <p className="mb-1 text-sm font-bold text-yellow-400">Jadwal Latihan</p>
              <p className="text-sm text-gray-300">Selasa, Kamis, Sabtu: 15.30 – 17.30 WIB</p>
              <p className="mt-2 text-xs text-gray-500">Lapangan Panahan UAC Unilak, Pekanbaru</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="p-8 bg-gray-800 border border-gray-700 rounded-3xl"
          >
            {submitted ? (
              <div className="py-8 text-center">
                <CheckCircle size={56} className="mx-auto mb-4 text-yellow-400" />
                <h3 className="mb-2 text-xl font-black text-white">Pendaftaran Berhasil!</h3>
                <p className="text-sm text-gray-400">Terima kasih, <strong className="text-yellow-400">{form.name}</strong>! Tim UAC akan menghubungimu segera melalui WhatsApp.</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 text-sm text-yellow-400 underline hover:text-yellow-300">Daftarkan yang lain</button>
              </div>
            ) : (
              <>
                <h3 className="mb-6 text-xl font-bold text-white">Form Pendaftaran</h3>
                <div className="space-y-4">
                  {[
                    { key: "name", label: "Nama Lengkap", placeholder: "Nama kamu..." },
                    { key: "nim", label: "NIM", placeholder: "Nomor Induk Mahasiswa" },
                    { key: "prodi", label: "Program Studi", placeholder: "Jurusan / Prodi" },
                    { key: "phone", label: "No. WhatsApp", placeholder: "08xx-xxxx-xxxx" },
                  ].map(({ key, label, placeholder }) => (
                    <div key={key}>
                      <label className="block text-gray-400 text-xs font-semibold mb-1.5 uppercase tracking-wide">{label}</label>
                      <input
                        type="text"
                        value={form[key]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        placeholder={placeholder}
                        className="w-full px-4 py-3 text-sm text-white placeholder-gray-500 transition-all border border-gray-600 bg-gray-700/50 rounded-xl focus:outline-none focus:border-yellow-500/60 focus:bg-gray-700"
                      />
                    </div>
                  ))}
                  <button
                    onClick={handleSubmit}
                    className="w-full mt-2 flex items-center justify-center gap-2 bg-yellow-500 text-gray-950 font-bold py-3.5 rounded-xl hover:bg-yellow-400 transition-all hover:scale-[1.02] shadow-lg shadow-yellow-500/25"
                  >
                    Kirim Pendaftaran
                    <ArrowRight size={18} />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}