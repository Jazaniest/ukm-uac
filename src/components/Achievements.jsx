//eslint-disable-next-line
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Trophy, MapPin, User, Calendar, ChevronDown, Medal, Award, Target } from "lucide-react";
import { achievementsData } from "../data/data";
import { useState, useMemo } from "react";

const medalConfig = {
  "Juara 1": {
    bg: "bg-yellow-500/20",
    text: "text-yellow-400",
    border: "border-yellow-500/50",
    icon: "🥇",
    gradient: "from-yellow-500/20 to-yellow-600/10"
  },
  "Juara 2": {
    bg: "bg-gray-400/20",
    text: "text-gray-300",
    border: "border-gray-400/50",
    icon: "🥈",
    gradient: "from-gray-400/20 to-gray-500/10"
  },
  "Juara 3": {
    bg: "bg-orange-600/20",
    text: "text-orange-400",
    border: "border-orange-500/50",
    icon: "🥉",
    gradient: "from-orange-600/20 to-orange-700/10"
  }
};

const getMedalStyle = (achievement) => {
  return medalConfig[achievement] || {
    bg: "bg-gray-700/50",
    text: "text-gray-400",
    border: "border-gray-600/50",
    icon: "🏅",
    gradient: "from-gray-700/20 to-gray-800/10"
  };
};

// Helper untuk group data
const groupByYear = (data) => {
  const grouped = data.reduce((acc, item) => {
    if (!acc[item.year]) {
      acc[item.year] = {};
    }
    // Group by athlete within year
    const key = `${item.athlete}-${item.faculty || 'Umum'}`;
    if (!acc[item.year][key]) {
      acc[item.year][key] = {
        athlete: item.athlete,
        faculty: item.faculty || "Umum",
        achievements: []
      };
    }
    acc[item.year][key].achievements.push(item);
    return acc;
  }, {});
  
  // Sort years descending
  return Object.entries(grouped)
    .sort(([a], [b]) => b - a)
    .map(([year, athletes]) => ({
      year,
      athletes: Object.values(athletes)
    }));
};

export default function Achievements() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [expandedYear, setExpandedYear] = useState(null);
  //eslint-disable-next-line
  const [searchTerm, setSearchTerm] = useState("");
  //eslint-disable-next-line
  const [filterMedal, setFilterMedal] = useState("all");

  const groupedData = useMemo(() => groupByYear(achievementsData), []);
  
  // Filter data
  const filteredData = useMemo(() => {
    return groupedData.map(yearData => ({
      ...yearData,
      athletes: yearData.athletes.map(athlete => ({
        ...athlete,
        achievements: athlete.achievements.filter(ach => {
          const matchesSearch = 
            ach.competition.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ach.athlete.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ach.category.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesMedal = filterMedal === "all" || ach.achievement === filterMedal;
          return matchesSearch && matchesMedal;
        })
      })).filter(a => a.achievements.length > 0)
    })).filter(y => y.athletes.length > 0);
  }, [groupedData, searchTerm, filterMedal]);

  const toggleYear = (year) => {
    setExpandedYear(expandedYear === year ? null : year);
  };

  // Stats untuk header
  const totalAchievements = achievementsData.length;
  const totalGold = achievementsData.filter(a => a.achievement === "Emas").length;
  const totalSilver = achievementsData.filter(a => a.achievement === "Perak").length;
  const totalBronze = achievementsData.filter(a => a.achievement === "Perunggu").length;

  return (
    <section id="achievements" className="py-24 bg-linear-to-b from-gray-900 via-gray-900 to-gray-800" ref={ref}>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <span className="text-sm font-bold tracking-widest text-yellow-400 uppercase">
            Catatan Emas
          </span>
          <h2 className="mt-2 mb-4 text-4xl font-black text-white sm:text-5xl lg:text-6xl">
            Daftar Prestasi
          </h2>
          <div className="w-24 h-1 mx-auto mb-6 rounded-full bg-linear-to-r from-yellow-500 to-yellow-600" />
          <p className="max-w-2xl mx-auto text-lg text-gray-400">
            Deretan pencapaian membanggakan yang diraih atlet-atlet UAC di berbagai tingkat kompetisi.
          </p>

          {/* Stats Cards */}
          <div className="grid max-w-3xl grid-cols-2 gap-4 mx-auto mt-10 md:grid-cols-4">
            <StatCard icon={<Trophy size={20} />} value={totalAchievements} label="Total Prestasi" color="text-yellow-400" bg="bg-yellow-500/10" />
            <StatCard icon={<Medal size={20} />} value={totalGold} label="Emas" color="text-yellow-400" bg="bg-yellow-500/10" />
            <StatCard icon={<Medal size={20} />} value={totalSilver} label="Perak" color="text-gray-300" bg="bg-gray-400/10" />
            <StatCard icon={<Medal size={20} />} value={totalBronze} label="Perunggu" color="text-orange-400" bg="bg-orange-500/10" />
          </div>
        </motion.div>

        {/* Filter & Search */}
        {/* <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center justify-between gap-4 p-4 mb-8 border md:flex-row bg-gray-800/50 rounded-2xl border-gray-700/50 backdrop-blur-sm"
        >
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Cari nama, kejuaraan, atau kategori..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 pl-10 pr-4 text-white placeholder-gray-500 transition-all bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20"
            />
            <Target className="absolute left-3 top-3.5 text-gray-500" size={18} />
          </div>
          
          <div className="flex w-full gap-2 pb-2 overflow-x-auto md:pb-0 md:w-auto">
            {["all", "Juara 1", "Juara 2", "Juara 3"].map((medal) => (
              <button
                key={medal}
                onClick={() => setFilterMedal(medal)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                  filterMedal === medal 
                    ? "bg-yellow-500 text-gray-900" 
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {medal === "all" ? "Semua Medali" : medal}
              </button>
            ))}
          </div>
        </motion.div> */}

        {/* Timeline / Year Groups */}
        <div className="space-y-4">
          {filteredData.map((yearData, yearIndex) => (
            <motion.div
              key={yearData.year}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: yearIndex * 0.1 }}
              className="overflow-hidden border bg-gray-800/40 rounded-2xl border-gray-700/50 backdrop-blur-sm"
            >
              {/* Year Header */}
              <button
                onClick={() => toggleYear(yearData.year)}
                className="flex items-center justify-between w-full px-6 py-5 transition-all bg-linear-to-r from-gray-800 to-gray-800/50 hover:from-gray-750 hover:to-gray-800/50 group"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 transition-colors border bg-yellow-500/10 rounded-xl border-yellow-500/20 group-hover:bg-yellow-500/20">
                    <Calendar size={24} className="text-yellow-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-white">{yearData.year}</h3>
                    <p className="text-sm text-gray-400">
                      {yearData.athletes.length} Atlet • {yearData.athletes.reduce((acc, a) => acc + a.achievements.length, 0)} Prestasi
                    </p>
                  </div>
                </div>
                <ChevronDown 
                  size={24} 
                  className={`text-gray-400 transition-transform duration-300 ${expandedYear === yearData.year ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Expandable Content */}
              <AnimatePresence>
                {expandedYear === yearData.year && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 space-y-4">
                      {yearData.athletes.map((athleteData, athleteIndex) => (
                        <AthleteCard 
                          key={`${athleteData.athlete}-${athleteIndex}`} 
                          data={athleteData} 
                          index={athleteIndex}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center text-gray-500"
          >
            <Trophy size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">Tidak ada prestasi yang ditemukan</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// Sub-components
function StatCard({ icon, value, label, color, bg }) {
  return (
    <div className="flex flex-col items-center p-4 border bg-gray-800/50 border-gray-700/50 rounded-xl">
      <div className={`${bg} ${color} p-2 rounded-lg mb-2`}>
        {icon}
      </div>
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-xs tracking-wider text-gray-500 uppercase">{label}</div>
    </div>
  );
}

function AthleteCard({ data, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="overflow-hidden transition-colors border bg-gray-900/50 rounded-xl border-gray-700/30 hover:border-yellow-500/30"
    >
      {/* Athlete Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b bg-gray-800/30 border-gray-700/30">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 border rounded-full bg-linear-to-br from-yellow-500/20 to-yellow-600/10 border-yellow-500/20">
            <User size={20} className="text-yellow-400" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white">{data.athlete}</h4>
            <span className="text-xs text-yellow-400/80 font-medium bg-yellow-500/10 px-2 py-0.5 rounded-full">
              {data.faculty}
            </span>
          </div>
        </div>
        <div className="flex gap-1">
          {data.achievements.map((ach, i) => (
            <span key={i} className="text-lg" title={ach.achievement}>
              {getMedalStyle(ach.achievement).icon}
            </span>
          ))}
        </div>
      </div>

      {/* Achievements List */}
      <div className="divide-y divide-gray-800/50">
        {data.achievements.map((achievement, i) => {
          const style = getMedalStyle(achievement.achievement);
          return (
            <div 
              key={i} 
              className="flex flex-col gap-3 px-5 py-4 transition-colors sm:flex-row sm:items-center sm:gap-4 hover:bg-gray-800/20"
            >
              {/* Medal Badge */}
              <div className={`shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${style.bg} ${style.border} ${style.text}`}>
                <Award size={14} />
                <span className="text-sm font-bold">{achievement.achievement}</span>
              </div>

              {/* Competition Details */}
              <div className="min-w-0 grow">
                <h5 className="text-sm font-semibold text-white truncate sm:text-base">
                  {achievement.competition}
                </h5>
                <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Target size={12} className="text-yellow-500/70" />
                    {achievement.category}
                  </span>
                  <span className="w-1 h-1 bg-gray-600 rounded-full" />
                  <span className="flex items-center gap-1">
                    <MapPin size={12} className="text-gray-500" />
                    {achievement.location}
                  </span>
                  {achievement.level && (
                    <>
                      <span className="w-1 h-1 bg-gray-600 rounded-full" />
                      <span className="px-2 py-0.5 rounded bg-gray-800 text-gray-300 border border-gray-700">
                        {achievement.level}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}