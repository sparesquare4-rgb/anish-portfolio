'use client';
import { useEffect, useRef } from 'react';

/* ── helpers ── */
const SL = ({ n, label }: { n: string; label: string }) => (
  <div className="flex items-center gap-2 mb-4" style={{ fontFamily: 'DM Mono, monospace' }}>
    <span className="text-xs tracking-[0.18em] uppercase" style={{ color: '#00ffd5' }}>{n}</span>
    <span className="w-14 h-px" style={{ background: 'rgba(0,255,213,0.3)' }} />
    <span className="text-xs tracking-[0.18em] uppercase" style={{ color: '#5a5a72' }}>{label}</span>
  </div>
);

const ST = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16 }}>
    {children}
  </h2>
);

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.animation = 'fadeUp 0.6s ease forwards';
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    const kids = el.querySelectorAll<HTMLElement>('[data-reveal]');
    kids.forEach((k, i) => { k.style.opacity = '0'; setTimeout(() => obs.observe(k), i * 70); });
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ═══════════════ MARQUEE ═══════════════ */
export function Marquee() {
  const items = ['LLM Integration','OpenAI API','Claude API','React.js','Node.js','Prompt Engineering','MLOps','Firebase','AI Product Mgmt','Digital Marketing','Financial Analytics','BCG X','Goldman Sachs','Deloitte','Accenture','Red Bull'];
  const all = [...items, ...items];
  return (
    <div className="overflow-hidden border-t border-b" style={{ borderColor: 'rgba(255,255,255,0.06)', padding: '14px 0', background: '#080810' }}>
      <div className="flex whitespace-nowrap" style={{ animation: 'marquee 22s linear infinite' }}>
        {all.map((t, i) => (
          <span key={i} className="px-7 text-xs tracking-[0.14em] uppercase flex items-center gap-3" style={{ color: '#5a5a72', fontFamily: 'DM Mono, monospace' }}>
            {t} <span style={{ color: '#00ffd5', fontSize: '0.5rem' }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════ ABOUT ═══════════════ */
export function About() {
  const ref = useReveal();
  return (
    <section id="about" className="section-pad" style={{ background: '#080810' }} ref={ref}>
      <SL n="01" label="About" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mt-12">
        <div data-reveal>
          <ST>Engineer. Builder.<br /><em style={{ color: '#00ffd5' }}>Problem Solver.</em></ST>
          {[
            <>I'm an <span style={{color:'#00ffd5'}}>AI Engineer and Product Manager</span> based in Ras Al Khaimah, UAE, specializing in deploying AI-powered applications using Large Language Models.</>,
            <>Hands-on experience shipping <span style={{color:'#00ffd5'}}>OpenAI and Claude API</span> integrations into real SaaS products — driving up to 80% reduction in manual processing time.</>,
            <>My background bridges <span style={{color:'#00ffd5'}}>financial analytics, workflow automation, and digital marketing</span> — a rare full-stack view from model to market.</>,
            <>Officially certified by <span style={{color:'#00ffd5'}}>Anthropic</span> in both the Claude API and Claude Code — among the first developers globally with these credentials.</>,
          ].map((p, i) => (
            <p key={i} className="text-sm leading-loose mb-4" style={{ color: 'rgba(238,238,248,0.62)', fontFamily: 'DM Mono, monospace', fontWeight: 300 }}>{p}</p>
          ))}
        </div>
        <div data-reveal className="flex justify-center">
          <div className="relative w-64 h-64">
            <div className="absolute inset-0 rounded-full border" style={{ borderColor: 'rgba(0,255,213,0.15)', animation: 'spin 18s linear infinite' }}>
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full" style={{ background: '#00ffd5', boxShadow: '0 0 12px #00ffd5' }} />
            </div>
            <div className="absolute inset-8 rounded-full border" style={{ borderColor: 'rgba(123,94,167,0.2)', animation: 'spin 12s linear infinite reverse' }} />
            <div className="absolute inset-0 flex items-center justify-center flex-col gap-1">
              <span style={{ fontFamily: 'Fraunces, serif', fontSize: '2.6rem', fontWeight: 700, color: '#00ffd5' }}>AI</span>
              <span className="text-xs tracking-widest text-center" style={{ color: '#5a5a72', fontFamily: 'DM Mono, monospace' }}>Engineer<br />& PM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ SKILLS ═══════════════ */
const skills = [
  { icon: '🤖', name: 'AI / LLM Engineering',   desc: 'Deploying LLMs into production with advanced prompt pipelines and contextual engineering.', tags: ['OpenAI API','Claude API','Prompt Eng.','MLOps'] },
  { icon: '⚛️', name: 'Full-Stack Dev',           desc: 'Building responsive web apps from backend APIs to polished front-end UIs.', tags: ['React.js','Node.js','Firebase','REST APIs'] },
  { icon: '📦', name: 'AI Product Mgmt',          desc: 'Full product lifecycle from ideation and scoping to deployment, pricing, and distribution.', tags: ['Roadmapping','PLM','Stakeholders'] },
  { icon: '📊', name: 'Financial Analytics',      desc: 'Turning raw data into structured reports, models, and audit-ready documentation.', tags: ['Excel','Data Viz','Reporting'] },
  { icon: '📣', name: 'Digital Marketing',        desc: 'HubSpot certified. Launched a monetized course covering SEO, paid ads, email funnels.', tags: ['SEO','Meta Ads','Google Ads'] },
  { icon: '⚙️', name: 'Workflow Automation',      desc: 'AI-powered pipelines eliminating manual work and improving operational ROI at scale.', tags: ['AI Pipelines','No-Code AI','BPO'] },
];

export function Skills() {
  const ref = useReveal();
  return (
    <section id="skills" className="section-pad" style={{ background: '#04040a' }} ref={ref}>
      <SL n="02" label="Expertise" />
      <ST>Core <em style={{ color: '#00ffd5' }}>Skills</em></ST>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-12" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
        {skills.map((s) => (
          <div
            key={s.name}
            data-reveal
            className="p-8 relative overflow-hidden group transition-colors duration-300"
            style={{ border: '1px solid rgba(255,255,255,0.06)', background: '#0e0e1a' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#13131f')}
            onMouseLeave={e => (e.currentTarget.style.background = '#0e0e1a')}
          >
            <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500" style={{ background: '#00ffd5' }} />
            <div className="text-2xl mb-3">{s.icon}</div>
            <div className="font-bold mb-2 text-base" style={{ fontFamily: 'Syne, sans-serif' }}>{s.name}</div>
            <div className="text-xs leading-relaxed mb-4" style={{ color: '#5a5a72', fontFamily: 'DM Mono, monospace' }}>{s.desc}</div>
            <div className="flex flex-wrap gap-1.5">
              {s.tags.map(t => (
                <span key={t} className="px-2 py-0.5 text-xs rounded-full" style={{ border: '1px solid rgba(255,255,255,0.06)', color: '#5a5a72', fontFamily: 'DM Mono, monospace' }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════ PROJECTS ═══════════════ */
const projects = [
  { n:'01', badge:'SaaS · AI',      title:'AI Resume Builder',       desc:'ATS-optimized resume generator via OpenAI API. Intelligent bullet rewriting, keyword matching, skills gap analysis, real-time preview, PDF export.', metrics:[{v:'80%',l:'Time Saved'},{v:'Full',l:'Stack'}], tags:['React.js','Node.js','OpenAI'] },
  { n:'02', badge:'Consumer · AI',  title:'AI Habit Tracker',        desc:'Full-stack habit app with AI motivational nudges and context-aware personalized feedback. Iterative prompt optimization drove measurable beta gains.', metrics:[{v:'25%',l:'Engagement ↑'},{v:'Beta',l:'Tested'}], tags:['Firebase','Prompt Eng.'] },
  { n:'03', badge:'Digital Product',title:'Bible Verse Generator',   desc:'AI tool generating contextually relevant Bible verses by user mood or keyword. End-to-end product from ideation to live deployment.', metrics:[{v:'LLM',l:'Powered'},{v:'Live',l:'Deployed'}], tags:['LLM','React.js'] },
  { n:'04', badge:'Education',      title:'Digital Marketing Course', desc:'Self-published monetized course: SEO, Meta Ads, Google Ads, email funnels, analytics, AI tools. Full lifecycle owned solo.', metrics:[{v:'Full',l:'PLM'},{v:'Live',l:'Revenue'}], tags:['SEO','Meta Ads'] },
  { n:'05', badge:'Freelance · UAE',title:'Investment Portfolio Site', desc:'Professional site for a UAE-based financial services client. Custom React components, fully mobile-responsive. Full stakeholder management, Dubai.', metrics:[{v:'UAE',l:'Client'},{v:'100%',l:'Mobile'}], tags:['React.js','Freelance'] },
];

export function Projects() {
  const ref = useReveal();
  return (
    <section id="projects" className="section-pad" style={{ background: '#080810' }} ref={ref}>
      <SL n="03" label="Shipped Work" />
      <ST>Featured <em style={{ color: '#00ffd5' }}>Projects</em></ST>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
        {projects.map(p => (
          <div
            key={p.n}
            data-reveal
            className="rounded-xl overflow-hidden transition-all duration-300 group"
            style={{ background: '#0e0e1a', border: '1px solid rgba(255,255,255,0.06)' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,255,213,0.12)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
          >
            <div className="p-6 pb-0 flex justify-between items-start">
              <span style={{ fontFamily: 'Fraunces, serif', fontSize: '3rem', fontWeight: 700, color: 'rgba(238,238,248,0.04)', lineHeight: 1 }}>{p.n}</span>
              <span className="px-3 py-0.5 text-xs tracking-wider uppercase rounded-full" style={{ background: 'rgba(0,255,213,0.08)', color: '#00ffd5', border: '1px solid rgba(0,255,213,0.18)', fontFamily: 'DM Mono, monospace' }}>{p.badge}</span>
            </div>
            <div className="p-6 pt-2">
              <div className="font-bold text-lg mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>{p.title}</div>
              <div className="text-xs leading-relaxed mb-4" style={{ color: '#5a5a72', fontFamily: 'DM Mono, monospace' }}>{p.desc}</div>
              <div className="flex gap-4 pt-4 border-t mb-4" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                {p.metrics.map(m => (
                  <div key={m.l}>
                    <div style={{ fontFamily: 'Fraunces, serif', fontSize: '1.25rem', color: '#f5c842', fontWeight: 700 }}>{m.v}</div>
                    <div className="text-xs mt-0.5" style={{ color: '#5a5a72', fontFamily: 'DM Mono, monospace' }}>{m.l}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map(t => <span key={t} className="px-2 py-0.5 text-xs rounded-full" style={{ border: '1px solid rgba(255,255,255,0.06)', color: '#5a5a72', fontFamily: 'DM Mono, monospace' }}>{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════ EXPERIENCE ═══════════════ */
const exp = [
  { period: 'Jul 2024 – Jul 2025', role: 'Finance & Operations Analyst', co: 'Cousin Corporation · Thrissur, India · Manufacturing', pts: ['Streamlined financial workflows reducing reporting cycle by ~18%','Improved account accuracy by ~20% via data-driven reconciliation','Negotiated vendor contracts achieving ~12% cost reductions'] },
  { period: 'Oct – Dec 2024',      role: 'Finance & Compliance Intern',  co: 'Jayaprakash CA & Associates · Thrissur · Accounting', pts: ['Prepared financial statements and managed GST statutory compliance','Developed knowledge of regulatory frameworks and client accounts'] },
  { period: 'Aug – Sep 2024',      role: 'Sales Analytics Intern',        co: 'Red Bull · Remote · Consumer Goods', pts: ['Structured and analyzed sales data for off-premise operations','Identified bottlenecks and collaborated on cross-functional solutions'] },
  { period: 'Jul – Sep 2024',      role: 'Data Analytics Intern',         co: 'Accenture · Remote · IT Consulting', pts: ['Applied statistical methods to large datasets for BI reporting','Full simulation: scoping → cleaning → modeling → visualization → presentation'] },
];

export function Experience() {
  const ref = useReveal();
  return (
    <section id="experience" className="section-pad" style={{ background: '#04040a' }} ref={ref}>
      <SL n="04" label="Experience" />
      <ST>Work <em style={{ color: '#00ffd5' }}>History</em></ST>
      <div className="mt-12 space-y-12">
        {exp.map((e, i) => (
          <div key={i} data-reveal className="grid gap-7" style={{ gridTemplateColumns: '140px 1px 1fr' }}>
            <div className="text-xs text-right pt-1 leading-relaxed" style={{ color: '#5a5a72', fontFamily: 'DM Mono, monospace' }}>{e.period}</div>
            <div className="flex flex-col items-center">
              <div className="w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0" style={{ background: '#00ffd5', boxShadow: '0 0 12px #00ffd5' }} />
              <div className="flex-1 w-px mt-1.5" style={{ background: 'rgba(255,255,255,0.06)' }} />
            </div>
            <div>
              <div className="font-bold text-base mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>{e.role}</div>
              <div className="text-xs mb-3" style={{ color: '#00ffd5', fontFamily: 'DM Mono, monospace' }}>{e.co}</div>
              <ul className="space-y-1.5">
                {e.pts.map((p, j) => (
                  <li key={j} className="text-xs pl-4 relative leading-relaxed" style={{ color: '#5a5a72', fontFamily: 'DM Mono, monospace' }}>
                    <span className="absolute left-0" style={{ color: '#00ffd5' }}>→</span>{p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════ CERTIFICATIONS ═══════════════ */
const certs = [
  { issuer: '🏆 Anthropic — Official', name: 'Claude with the Anthropic API', date: 'March 7, 2026 · #xh88uinh6jr8' },
  { issuer: '🏆 Anthropic — Official', name: 'Claude Code in Action',           date: 'March 7, 2026 · #23mo5rvi898t' },
  { issuer: '📘 HubSpot Academy',       name: 'Digital Marketing Certified',     date: 'Active Feb 2026 – Mar 2027' },
  { issuer: '💼 BCG X × Forage',        name: 'GenAI Job Simulation',            date: 'March 2026' },
  { issuer: '📊 Deloitte × Forage',     name: 'Data Analytics Simulation',       date: 'February 2026' },
  { issuer: '🏦 Goldman Sachs × Forage',name: 'Controllers Job Simulation',      date: 'February 2026' },
  { issuer: '🔵 Accenture × Forage',    name: 'Data Analytics & Visualization',  date: 'September 2024' },
  { issuer: '🔴 Red Bull × Forage',     name: 'Off-Premise Sales Simulation',    date: 'September 2024' },
];

export function Certifications() {
  const ref = useReveal();
  return (
    <section id="certifications" className="section-pad" style={{ background: '#080810' }} ref={ref}>
      <SL n="05" label="Credentials" />
      <ST>Certs & <em style={{ color: '#00ffd5' }}>Simulations</em></ST>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
        {certs.map((c, i) => (
          <div
            key={i}
            data-reveal
            className="p-5 rounded-lg relative overflow-hidden transition-all duration-300"
            style={{ background: '#0e0e1a', border: '1px solid rgba(255,255,255,0.06)' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(0,255,213,0.3)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}
          >
            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full" style={{ background: 'rgba(0,255,213,0.05)', filter: 'blur(16px)' }} />
            <div className="text-xs tracking-wider uppercase mb-2" style={{ color: '#00ffd5', fontFamily: 'DM Mono, monospace' }}>{c.issuer}</div>
            <div className="font-bold text-sm mb-2 leading-snug" style={{ fontFamily: 'Syne, sans-serif' }}>{c.name}</div>
            <div className="text-xs" style={{ color: '#5a5a72', fontFamily: 'DM Mono, monospace' }}>{c.date}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════ CONTACT ═══════════════ */
export function Contact() {
  return (
    <section id="contact" className="section-pad flex flex-col items-center text-center" style={{ background: '#04040a', padding: '120px 48px' }}>
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xs tracking-[0.18em] uppercase" style={{ color: '#00ffd5', fontFamily: 'DM Mono, monospace' }}>06 — Contact</span>
      </div>
      <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(3rem,7vw,5.5rem)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.04em', marginBottom: 24 }}>
        Let's <em style={{ color: '#00ffd5' }}>Build</em><br />Something Great.
      </h2>
      <p className="text-sm leading-loose max-w-md mb-12" style={{ color: '#5a5a72', fontFamily: 'DM Mono, monospace' }}>
        Open to AI engineering roles, product collaborations, and freelance AI projects. Based in Ras Al Khaimah — available globally.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        {[
          { icon: '✉', label: 'anishanto369@gmail.com',          href: 'mailto:anishanto369@gmail.com' },
          { icon: '📞', label: '+971 521 379 125',               href: 'tel:+971521379125' },
          { icon: '💼', label: 'linkedin.com/in/anish-anto-ai',  href: 'https://linkedin.com/in/anish-anto-ai' },
        ].map(l => (
          <a
            key={l.href}
            href={l.href}
            target={l.href.startsWith('http') ? '_blank' : undefined}
            className="flex items-center gap-2.5 px-6 py-3 text-xs rounded-sm transition-all duration-200"
            style={{ border: '1px solid rgba(255,255,255,0.06)', color: '#eeeef8', fontFamily: 'DM Mono, monospace' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#00ffd5'; e.currentTarget.style.color = '#00ffd5'; e.currentTarget.style.background = 'rgba(0,255,213,0.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#eeeef8'; e.currentTarget.style.background = ''; }}
          >
            <span>{l.icon}</span>{l.label}
          </a>
        ))}
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="flex justify-between items-center px-12 py-5 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
      <span className="text-xs" style={{ color: '#5a5a72', fontFamily: 'DM Mono, monospace' }}>© 2026 Anish Anto · Ras Al Khaimah, UAE</span>
      <span className="text-xs" style={{ color: '#5a5a72', fontFamily: 'DM Mono, monospace' }}>Built with code, creativity & Claude.</span>
    </footer>
  );
}
