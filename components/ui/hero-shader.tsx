'use client';

import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useAspect, useTexture } from '@react-three/drei';
import { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three/webgpu';
import { bloom } from 'three/examples/jsm/tsl/display/BloomNode.js';
import { Mesh } from 'three';
import {
  abs, blendScreen, float, mod, mx_cell_noise_float,
  oneMinus, smoothstep, texture, uniform, uv, vec2, vec3,
  pass, mix, add
} from 'three/tsl';

// ── Anish's portrait + depth map
// Using a professional AI/tech themed image with matching depth
const TEXTUREMAP = { src: 'https://i.postimg.cc/XYwvXN8D/img-4.png' };
const DEPTHMAP   = { src: 'https://i.postimg.cc/2SHKQh2q/raw-4.webp' };

extend(THREE as any);

/* ── Post Processing: bloom + scan line ── */
const PostProcessing = ({
  strength = 1.2,
  threshold = 0.9,
  fullScreenEffect = true,
}: {
  strength?: number;
  threshold?: number;
  fullScreenEffect?: boolean;
}) => {
  const { gl, scene, camera } = useThree();
  const progressRef = useRef<{ value: number }>({ value: 0 });

  const render = useMemo(() => {
    const postProcessing = new THREE.PostProcessing(gl as any);
    const scenePass = pass(scene, camera);
    const scenePassColor = scenePass.getTextureNode('output');
    const bloomPass = bloom(scenePassColor, strength, 0.5, threshold);

    const uScanProgress = uniform(0);
    progressRef.current = uScanProgress as unknown as { value: number };

    const scanPos = float(uScanProgress.value);
    const uvY = uv().y;
    const scanWidth = float(0.04);
    const scanLine = smoothstep(0, scanWidth, abs(uvY.sub(scanPos)));
    // Teal scan line instead of red — matches Anish's brand color
    const scanOverlay = vec3(0, 1, 0.83).mul(oneMinus(scanLine)).mul(0.5);

    const withScanEffect = mix(
      scenePassColor,
      add(scenePassColor, scanOverlay),
      fullScreenEffect ? smoothstep(0.88, 1.0, oneMinus(scanLine)) : 1.0
    );

    const final = withScanEffect.add(bloomPass);
    postProcessing.outputNode = final;
    return postProcessing;
  }, [camera, gl, scene, strength, threshold, fullScreenEffect]);

  useFrame(({ clock }) => {
    (progressRef.current as any).value = Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5;
    render.renderAsync();
  }, 1);

  return null;
};

const WIDTH = 300;
const HEIGHT = 300;

/* ── 3D Scene with depth-parallax shader ── */
const Scene = () => {
  const [rawMap, depthMap] = useTexture([TEXTUREMAP.src, DEPTHMAP.src]);
  const meshRef = useRef<Mesh>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (rawMap && depthMap) setVisible(true);
  }, [rawMap, depthMap]);

  const { material, uniforms } = useMemo(() => {
    const uPointer  = uniform(new THREE.Vector2(0));
    const uProgress = uniform(0);
    const strength  = 0.012;

    const tDepthMap = texture(depthMap);
    const tMap = texture(rawMap, uv().add(tDepthMap.r.mul(uPointer).mul(strength)));

    const aspect  = float(WIDTH).div(HEIGHT);
    const tUv     = vec2(uv().x.mul(aspect), uv().y);
    const tiling  = vec2(120.0);
    const tiledUv = mod(tUv.mul(tiling), 2.0).sub(1.0);

    const brightness = mx_cell_noise_float(tUv.mul(tiling).div(2));
    const dist  = float(tiledUv.length());
    const dot   = float(smoothstep(0.5, 0.49, dist)).mul(brightness);
    const depth = tDepthMap;
    const flow  = oneMinus(smoothstep(0, 0.02, abs(depth.sub(uProgress))));

    // Teal dot-matrix scanline mask — brand-matched
    const mask  = dot.mul(flow).mul(vec3(0, 1, 0.83)).mul(8);
    const final = blendScreen(tMap, mask);

    const material = new THREE.MeshBasicNodeMaterial({
      colorNode: final,
      transparent: true,
      opacity: 0,
    } as any);

    return { material, uniforms: { uPointer, uProgress } };
  }, [rawMap, depthMap]);

  const [w, h] = useAspect(WIDTH, HEIGHT);

  useFrame(({ clock }) => {
    uniforms.uProgress.value = Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5;
    if (meshRef.current) {
      const mat = meshRef.current.material as any;
      if ('opacity' in mat) {
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, visible ? 1 : 0, 0.06);
      }
    }
  });

  useFrame(({ pointer }) => { uniforms.uPointer.value = pointer; });

  return (
    <mesh ref={meshRef} scale={[w * 0.42, h * 0.42, 1]} material={material}>
      <planeGeometry />
    </mesh>
  );
};

/* ── Overlay HTML ── */
const HeroOverlay = () => {
  const nameWords   = ['Anish', 'Anto'];
  const titleWords  = ['AI Engineer', '·', 'Product Manager', '·', 'MLOps'];
  const subtitle    = 'Certified by Anthropic. Building production AI with LLMs, OpenAI & Claude APIs.';

  const [visibleWords, setVisibleWords] = useState(0);
  const [titleVisible, setTitleVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [delays, setDelays] = useState<number[]>([]);

  useEffect(() => {
    setDelays(nameWords.map(() => Math.random() * 0.06));
  }, []);

  useEffect(() => {
    if (visibleWords < nameWords.length) {
      const t = setTimeout(() => setVisibleWords(v => v + 1), 500);
      return () => clearTimeout(t);
    } else {
      const t1 = setTimeout(() => setTitleVisible(true), 300);
      const t2 = setTimeout(() => setSubtitleVisible(true), 800);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [visibleWords]);

  return (
    <div className="absolute inset-0 z-50 pointer-events-none flex flex-col justify-center px-12 md:px-20">
      {/* Available badge */}
      <div
        className="inline-flex items-center gap-2 mb-8 self-start pointer-events-auto"
        style={{ opacity: visibleWords > 0 ? 1 : 0, transition: 'opacity 0.5s' }}
      >
        <div className="flex items-center gap-2 px-3 py-1.5 border border-white/10 rounded-full text-xs tracking-widest uppercase"
          style={{ color: '#00ffd5', fontFamily: 'DM Mono, monospace' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ffd5] animate-pulse" />
          Open to AI Roles · UAE-based
        </div>
      </div>

      {/* Big name */}
      <div className="flex gap-4 md:gap-6 overflow-hidden mb-4">
        {nameWords.map((word, i) => (
          <span
            key={i}
            className={`text-[clamp(4rem,12vw,9rem)] font-bold leading-none tracking-tighter ${i < visibleWords ? 'fade-in' : 'opacity-0'}`}
            style={{
              fontFamily: 'Fraunces, serif',
              animationDelay: `${i * 0.15 + (delays[i] || 0)}s`,
              color: i === 1 ? '#00ffd5' : '#eeeef8',
              fontStyle: i === 1 ? 'italic' : 'normal',
            }}
          >
            {word}
          </span>
        ))}
      </div>

      {/* Role line */}
      <div
        className={`text-sm md:text-base tracking-[0.2em] uppercase mb-6 ${titleVisible ? 'fade-in-subtitle' : 'opacity-0'}`}
        style={{ color: '#5a5a72', fontFamily: 'DM Mono, monospace' }}
      >
        AI Engineer &nbsp;·&nbsp; Product Manager &nbsp;·&nbsp; MLOps
      </div>

      {/* Subtitle */}
      <div
        className={`text-sm md:text-lg max-w-md leading-relaxed mb-10 ${subtitleVisible ? 'fade-in-subtitle' : 'opacity-0'}`}
        style={{ color: 'rgba(238,238,248,0.55)', fontFamily: 'DM Mono, monospace', fontWeight: 300 }}
      >
        {subtitle}
      </div>

      {/* CTAs */}
      <div
        className={`flex gap-4 pointer-events-auto ${subtitleVisible ? 'fade-in-subtitle' : 'opacity-0'}`}
        style={{ animationDelay: '0.3s' }}
      >
        <a
          href="#projects"
          className="px-7 py-3 text-xs font-bold tracking-widest uppercase rounded-sm transition-all duration-200 hover:-translate-y-0.5"
          style={{
            background: '#00ffd5', color: '#04040a',
            fontFamily: 'Syne, sans-serif',
            boxShadow: '0 0 0 0 rgba(0,255,213,0)',
          }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,255,213,0.35)')}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 0 0 rgba(0,255,213,0)')}
        >
          Explore Work
        </a>
        <a
          href="#contact"
          className="px-7 py-3 text-xs font-bold tracking-widest uppercase rounded-sm border transition-all duration-200"
          style={{
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#eeeef8', fontFamily: 'Syne, sans-serif',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#00ffd5'; e.currentTarget.style.color = '#00ffd5'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#eeeef8'; }}
        >
          Get in Touch
        </a>
      </div>

      {/* Stats */}
      <div
        className={`flex gap-10 mt-12 pt-8 border-t border-white/5 ${subtitleVisible ? 'fade-in-subtitle' : 'opacity-0'}`}
        style={{ animationDelay: '0.5s' }}
      >
        {[
          { n: '80%', l: 'Time Saved via AI' },
          { n: '5',   l: 'AI Apps Shipped' },
          { n: '7',   l: 'Industry Sims' },
        ].map(s => (
          <div key={s.l} className="border-l border-white/10 pl-4">
            <div className="text-3xl font-bold" style={{ fontFamily: 'Fraunces, serif', color: '#00ffd5' }}>{s.n}</div>
            <div className="text-xs tracking-widest uppercase mt-1" style={{ color: '#5a5a72' }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Main Hero export ── */
export default function HeroShader() {
  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: '100svh', background: '#04040a' }}
    >
      {/* WebGPU Canvas — full bleed background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          flat
          style={{ width: '100%', height: '100%' }}
          gl={async (props) => {
            const renderer = new THREE.WebGPURenderer(props as any);
            await renderer.init();
            return renderer;
          }}
        >
          <PostProcessing fullScreenEffect={true} />
          <Scene />
        </Canvas>
      </div>

      {/* Dark gradient overlay so text is readable */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(4,4,10,0.92) 0%, rgba(4,4,10,0.7) 50%, rgba(4,4,10,0.2) 100%)',
        }}
      />

      {/* Text content */}
      <HeroOverlay />

      {/* Scroll indicator */}
      <button
        className="explore-btn"
        style={{ animationDelay: '3s' }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        Scroll to explore
        <span className="explore-arrow">
          <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
            <path d="M11 5V17" stroke="#00ffd5" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M6 12L11 17L16 12" stroke="#00ffd5" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </span>
      </button>
    </section>
  );
}
