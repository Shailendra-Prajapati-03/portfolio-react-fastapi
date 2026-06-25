import { Helmet } from "react-helmet-async";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollProgress from "./components/layout/ScrollProgress";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Qualification from "./components/sections/Qualification";
import Services from "./components/sections/Services";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import { profile } from "./data/content";

export default function App() {
  return (
    <>
      <Helmet>
        <title>{profile.name} — {profile.role}</title>
        <meta name="description" content={profile.tagline} />
      </Helmet>

      {/* Skip link for keyboard / screen-reader users */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70]
          focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Qualification />
        <Services />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
