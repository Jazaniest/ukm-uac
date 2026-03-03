import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Management from "./components/Management";
import Achievements from "./components/Achievements";
import Events from "./components/Events";
import MuriRecord from "./components/MuriRecord";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import Registration from "./components/Registration";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="text-white bg-gray-950 scroll-smooth">
      <Navbar />
      <Hero />
      <About />
      <Management />
      <Achievements />
      <Events />
      <MuriRecord />
      <Gallery />
      <Testimonials />
      <Registration />
      <Footer />
    </div>
  );
}