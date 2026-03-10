'use client';
import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  let rx = 0, ry = 0;

  useEffect(() => {
    let mx = 0, my = 0;
    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener('mousemove', move);

    let frame: number;
    const loop = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      if (dot.current)  { dot.current.style.left  = mx - 5 + 'px'; dot.current.style.top  = my - 5 + 'px'; }
      if (ring.current) { ring.current.style.left = rx - 16 + 'px'; ring.current.style.top = ry - 16 + 'px'; }
      frame = requestAnimationFrame(loop);
    };
    loop();

    const over = () => { if (dot.current) dot.current.style.transform = 'scale(2.5)'; if (ring.current) ring.current.style.transform = 'scale(1.5)'; };
    const out  = () => { if (dot.current) dot.current.style.transform = ''; if (ring.current) ring.current.style.transform = ''; };
    document.querySelectorAll('a, button').forEach(el => { el.addEventListener('mouseenter', over); el.addEventListener('mouseleave', out); });

    return () => { document.removeEventListener('mousemove', move); cancelAnimationFrame(frame); };
  }, []);

  return (
    <>
      <div ref={dot}  className="fixed w-2.5 h-2.5 rounded-full pointer-events-none z-[9999] transition-transform duration-150" style={{ background: '#00ffd5', mixBlendMode: 'difference' }} />
      <div ref={ring} className="fixed w-8 h-8 rounded-full pointer-events-none z-[9998] transition-transform duration-200" style={{ border: '1px solid rgba(0,255,213,0.4)' }} />
    </>
  );
}
