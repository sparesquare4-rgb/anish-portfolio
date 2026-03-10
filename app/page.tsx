import Nav from '@/components/ui/nav';
import { Marquee, About, Skills, Projects, Experience, Certifications, Contact, Footer } from '@/components/ui/sections';
import Cursor from '@/components/ui/cursor';
import HeroWrapper from '@/components/ui/HeroWrapper'; // Import the wrapper you just created

export default function Home() {
  return (
    <>
      <Cursor />
      {/* Scroll progress */}
      <div id="scroll-prog" className="fixed top-0 left-0 h-0.5 z-[300] transition-all duration-100" style={{ background: 'linear-gradient(90deg,#00ffd5,#7b5ea7)', width: '0%' }} />
      <Nav />
      <main>
        <HeroWrapper /> {/* Now using the wrapper */}
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <script dangerouslySetInnerHTML={{ __html: `
        window.addEventListener('scroll', () => {
          const p = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
          const el = document.getElementById('scroll-prog');
          if (el) el.style.width = p + '%';
        });
      `}} />
    </>
  );
}