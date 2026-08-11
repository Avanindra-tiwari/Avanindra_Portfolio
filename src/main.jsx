import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

import Preloader from "./components/Preloader";
import ScrollProgress from "./components/ScrollProgress";
import MouseGlow from "./components/MouseGlow";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Analytics from "./components/Analytics";
import Marquee from "./components/Marquee";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import ResumeSection from "./components/ResumeSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const [dark, setDark] = React.useState(true);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      <div className={`app-wrap ${loaded ? "app-visible" : "app-hidden"}`}>
        <div className="noise-overlay" />
        <ScrollProgress />
        <MouseGlow />
        <CustomCursor />

        <Navbar dark={dark} setDark={setDark} />

        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Analytics />
          <Marquee />
          <Education />
          <Certifications />
          <ResumeSection />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
