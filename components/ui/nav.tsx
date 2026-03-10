'use client';
import { useState, useEffect } from 'react';

const links = [
  { href: '#about',         label: 'About' },
  { href: '#skills',        label: 'Skills' },
  { href: '#projects',      label: 'Projects' },
  { href: '#experience',    label: 'Experience' },
  { href: '#certifications',label: 'Certs' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[200] h-16 flex items-center justify-between px-12 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(4,4,10,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <div style={{ fontFamily: 'Fraunces, serif', fontSize: '1.15rem', fontWeight: 700, color: '#00ffd5' }}>
        AA.
      </div>
      <div className="flex items-center gap-7">
        {links.map(l => (
          <a
            key={l.href}
            href={l.href}
            className="text-xs tracking-widest uppercase transition-colors duration-200"
            style={{ color: '#5a5a72', fontFamily: 'DM Mono, monospace' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#00ffd5')}
            onMouseLeave={e => (e.currentTarget.style.color = '#5a5a72')}
          >
            {l.label}
          </a>
        ))}
        <a
          href="#contact"
          className="px-4 py-1.5 text-xs tracking-widest uppercase rounded-full transition-all duration-200"
          style={{
            border: '1px solid rgba(0,255,213,0.3)',
            color: '#00ffd5',
            fontFamily: 'DM Mono, monospace',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,255,213,0.08)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          Hire Me →
        </a>
      </div>
    </nav>
  );
}
