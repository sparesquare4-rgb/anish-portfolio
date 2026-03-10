'use client';

import dynamic from 'next/dynamic';

// We move the dynamic import here, where 'use client' is active
const HeroShader = dynamic(() => import('@/components/ui/hero-shader'), {
  ssr: false,
  loading: () => (
    <div className="w-full flex items-center justify-center" style={{ height: '100svh', background: '#04040a' }}>
      <div className="text-xs tracking-widest uppercase animate-pulse" style={{ color: '#00ffd5' }}>
        Initializing WebGPU...
      </div>
    </div>
  ),
});

export default function HeroWrapper() {
  return <HeroShader />;
}