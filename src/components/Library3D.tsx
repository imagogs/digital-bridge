import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, useCursor, Loader, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { tools } from '../data/tools';
import type { Section } from '../App';

// Only show unlocked (base) modules on the shelf
const visibleTools = tools.filter(t => !t.locked);

interface BookTheme {
  colorTop: string;
  colorMid: string;
  colorBottom: string;
  accentHex: string;
  pattern: 'shield' | 'mail' | 'wave' | 'grid' | 'table' | 'arch';
}

const bookThemes: Record<string, BookTheme> = {
  spid:         { colorTop: '#3b82f6', colorMid: '#1d4ed8', colorBottom: '#0f172a', accentHex: '#93c5fd', pattern: 'shield' },
  pec:          { colorTop: '#818cf8', colorMid: '#4f46e5', colorBottom: '#1e1b4b', accentHex: '#c7d2fe', pattern: 'mail'   },
  email:        { colorTop: '#34d399', colorMid: '#059669', colorBottom: '#022c22', accentHex: '#6ee7b7', pattern: 'wave'   },
  word:         { colorTop: '#60a5fa', colorMid: '#1e40af', colorBottom: '#0f172a', accentHex: '#93c5fd', pattern: 'grid'   },
  excel:        { colorTop: '#4ade80', colorMid: '#15803d', colorBottom: '#052e16', accentHex: '#86efac', pattern: 'table'  },
  'portali-pa': { colorTop: '#a78bfa', colorMid: '#7c3aed', colorBottom: '#1e1b4b', accentHex: '#ddd6fe', pattern: 'arch'  },
};

const fallbackTheme: BookTheme = {
  colorTop: '#64748b', colorMid: '#334155', colorBottom: '#0f172a',
  accentHex: '#94a3b8', pattern: 'grid',
};

function createBookCoverTexture(theme: BookTheme, name: string, moduleCode: string): THREE.CanvasTexture {
  const W = 256, H = 384;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  // Vertical gradient background
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0,    theme.colorTop);
  grad.addColorStop(0.45, theme.colorMid);
  grad.addColorStop(1,    theme.colorBottom);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Geometric pattern (subtle)
  ctx.save();
  ctx.globalAlpha = 0.12;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1;

  if (theme.pattern === 'shield') {
    const cx = W / 2, cy = H * 0.62, r = 68;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
      if (i === 0) ctx.moveTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
      else ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
    }
    ctx.closePath(); ctx.stroke();
    ctx.globalAlpha = 0.07;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
      if (i === 0) ctx.moveTo(cx + r * 0.55 * Math.cos(angle), cy + r * 0.55 * Math.sin(angle));
      else ctx.lineTo(cx + r * 0.55 * Math.cos(angle), cy + r * 0.55 * Math.sin(angle));
    }
    ctx.closePath(); ctx.stroke();
  } else if (theme.pattern === 'mail') {
    const ex = 40, ey = H * 0.55, ew = W - 80, eh = 70;
    ctx.strokeRect(ex, ey, ew, eh);
    ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ex + ew / 2, ey + eh * 0.5); ctx.lineTo(ex + ew, ey); ctx.stroke();
  } else if (theme.pattern === 'wave') {
    for (let row = 0; row < 3; row++) {
      const yBase = H * 0.5 + row * 28;
      ctx.beginPath();
      for (let x = 0; x <= W; x += 2) {
        const y = yBase + Math.sin((x / W) * Math.PI * 4) * 10;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  } else if (theme.pattern === 'grid') {
    const startY = H * 0.38, step = 22;
    for (let x = 0; x < W; x += step) { ctx.beginPath(); ctx.moveTo(x, startY); ctx.lineTo(x, H); ctx.stroke(); }
    for (let y = startY; y < H; y += step) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  } else if (theme.pattern === 'table') {
    const sx = 30, sy = H * 0.5, cw = (W - 60) / 3, rh = 26;
    for (let c = 0; c <= 3; c++) { ctx.beginPath(); ctx.moveTo(sx + c * cw, sy); ctx.lineTo(sx + c * cw, sy + rh * 4); ctx.stroke(); }
    for (let r = 0; r <= 4; r++) { ctx.beginPath(); ctx.moveTo(sx, sy + r * rh); ctx.lineTo(sx + cw * 3, sy + r * rh); ctx.stroke(); }
  } else if (theme.pattern === 'arch') {
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(W / 2, H * 0.72, 35 + i * 22, Math.PI, 0);
      ctx.stroke();
    }
  }
  ctx.restore();

  // Top highlight bar
  const hlGrad = ctx.createLinearGradient(0, 0, W, 0);
  hlGrad.addColorStop(0,   'rgba(255,255,255,0)');
  hlGrad.addColorStop(0.3, theme.accentHex);
  hlGrad.addColorStop(0.7, theme.accentHex);
  hlGrad.addColorStop(1,   'rgba(255,255,255,0)');
  ctx.fillStyle = hlGrad;
  ctx.fillRect(0, 0, W, 3);
  ctx.globalAlpha = 0.35;
  ctx.fillStyle = theme.accentHex;
  ctx.fillRect(0, 3, W, 1);
  ctx.globalAlpha = 1;

  // Module code
  ctx.font = '600 18px "SF Mono", "Fira Code", monospace';
  ctx.fillStyle = 'rgba(255,255,255,0.45)';
  ctx.fillText(moduleCode, 18, 38);

  // Divider line
  const divGrad = ctx.createLinearGradient(0, 0, W, 0);
  divGrad.addColorStop(0,    'rgba(255,255,255,0)');
  divGrad.addColorStop(0.15, 'rgba(255,255,255,0.18)');
  divGrad.addColorStop(0.85, 'rgba(255,255,255,0.18)');
  divGrad.addColorStop(1,    'rgba(255,255,255,0)');
  ctx.fillStyle = divGrad;
  ctx.fillRect(0, 52, W, 1);

  // Module name
  ctx.font = 'bold 28px Georgia, serif';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  const words = name.split(' ');
  const maxLineW = W - 36;
  let line = '';
  const lines: string[] = [];
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxLineW && line) { lines.push(line); line = word; }
    else { line = test; }
  }
  if (line) lines.push(line);
  const lineH = 34;
  const textBlockY = H * 0.33 - (lines.length * lineH) / 2;
  lines.forEach((l, i) => ctx.fillText(l, W / 2, textBlockY + i * lineH));

  // Bottom vignette
  const vignette = ctx.createLinearGradient(0, H * 0.7, 0, H);
  vignette.addColorStop(0, 'rgba(0,0,0,0)');
  vignette.addColorStop(1, 'rgba(0,0,0,0.45)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, H * 0.7, W, H * 0.3);

  ctx.textAlign = 'left';
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createSpineTexture(theme: BookTheme): THREE.CanvasTexture {
  const W = 32, H = 256;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, theme.colorTop);
  grad.addColorStop(1, theme.colorBottom);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function Book({ tool, position, onClick, isSelected }: any) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const theme = bookThemes[tool.id] ?? fallbackTheme;

  const coverTexture = useMemo(
    () => createBookCoverTexture(theme, tool.name, tool.moduleCode),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tool.id]
  );
  const spineTexture = useMemo(
    () => createSpineTexture(theme),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tool.id]
  );

  useEffect(() => {
    return () => {
      coverTexture.dispose();
      spineTexture.dispose();
    };
  }, [coverTexture, spineTexture]);

  const targetZ = isSelected ? 1.2 : hovered ? 0.18 : 0;
  const targetY = isSelected ? position[1] + 0.12 : hovered ? position[1] + 0.04 : position[1];
  const targetRotX = isSelected ? -0.05 : 0;

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.position.z = THREE.MathUtils.lerp(
        meshRef.current.position.z,
        position[2] + targetZ,
        delta * 5
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        targetY,
        delta * 5
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotX,
        delta * 5
      );
    }
  });

  return (
    <group
      ref={meshRef}
      position={position}
      onClick={(e) => { e.stopPropagation(); onClick(tool.id); }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
    >
      {/* Front cover — canvas-textured gradient */}
      <mesh position={[0, 0, 0.065]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 1.3, 0.02]} />
        <meshStandardMaterial map={coverTexture} roughness={0.55} metalness={0.08} envMapIntensity={0.6} />
      </mesh>
      {/* Back cover — plain dark */}
      <mesh position={[0, 0, -0.065]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 1.3, 0.02]} />
        <meshStandardMaterial color={theme.colorBottom} roughness={0.7} metalness={0.05} />
      </mesh>
      {/* Spine */}
      <mesh position={[-0.44, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.02, 1.3, 0.15]} />
        <meshStandardMaterial map={spineTexture} roughness={0.65} metalness={0.05} />
      </mesh>
      {/* Pages */}
      <mesh position={[0.02, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.86, 1.26, 0.11]} />
        <meshStandardMaterial color="#f5f0e8" roughness={0.85} />
      </mesh>

      {/* Selection aura — emissive overlay on front cover */}
      {isSelected && (
        <mesh position={[0, 0, 0.082]}>
          <planeGeometry args={[0.93, 1.33]} />
          <meshStandardMaterial
            color={theme.accentHex}
            emissive={theme.accentHex}
            emissiveIntensity={0.18}
            transparent
            opacity={0.25}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Point light that travels with the book when selected */}
      {isSelected && (
        <pointLight position={[0, 0.4, 0.6]} intensity={1.5} color={theme.accentHex} distance={2.5} decay={2} />
      )}
    </group>
  );
}

function LibraryBackground() {
  const texture = useTexture(
    'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2560&auto=format&fit=crop'
  );
  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
    }
  }, [texture]);
  return (
    <mesh position={[0, 4, -18]} rotation={[0, 0, 0]}>
      <planeGeometry args={[150, 60]} />
      <meshBasicMaterial map={texture} color="#d4d4d4" toneMapped={false} />
    </mesh>
  );
}

function InteractiveShelf() {
  return (
    <group position={[0, -0.05, 0]}>
      <mesh receiveShadow castShadow>
        <boxGeometry args={[100, 0.1, 2.5]} />
        <meshStandardMaterial color="#3d2210" roughness={0.55} metalness={0.15} />
      </mesh>
      {/* Indigo edge glow strip along the front lip */}
      <mesh position={[0, 0.01, 1.25]}>
        <boxGeometry args={[12, 0.008, 0.008]} />
        <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={1.2} roughness={0} metalness={1} />
      </mesh>
      <mesh position={[0, -4.05, 0]} receiveShadow castShadow>
        <boxGeometry args={[100, 8, 2.2]} />
        <meshStandardMaterial color="#0d0d12" roughness={0.95} metalness={0.0} />
      </mesh>
    </group>
  );
}

function CameraRig({
  selectedToolId,
  section,
}: {
  selectedToolId: string | null;
  section: Section;
}) {
  useFrame((state, delta) => {
    const targetPos = new THREE.Vector3(0, 1.5, 6.5);
    const targetLook = new THREE.Vector3(0, 1.0, 0);

    if (section === 'library' && selectedToolId) {
      const index = visibleTools.findIndex(t => t.id === selectedToolId);
      const xOffset = (index - (visibleTools.length - 1) / 2) * 1.1;
      targetPos.set(xOffset, 0.65, 1.8);
      targetLook.set(xOffset, 0.65, 1.2);
    } else if (section !== 'library') {
      // Dormant: pull back a little so the overlay covers gracefully
      targetPos.set(0, 2.0, 8.5);
      targetLook.set(0, 1.0, 0);
    }

    state.camera.position.lerp(targetPos, delta * 2.5);

    const currentLook = new THREE.Vector3(0, 0, -1)
      .applyQuaternion(state.camera.quaternion)
      .add(state.camera.position);
    currentLook.lerp(targetLook, delta * 2.5);
    state.camera.lookAt(currentLook);
  });
  return null;
}

export function Library3D({
  selectedToolId,
  onSelectTool,
  section,
}: {
  selectedToolId: string | null;
  onSelectTool: (id: string) => void;
  section: Section;
}) {
  const count = visibleTools.length; // 6

  return (
    <div className="absolute inset-0 z-0">
      <Canvas shadows camera={{ position: [0, 1.5, 6.5], fov: 45 }}>
        <Suspense fallback={null}>
          <color attach="background" args={['#060609']} />
          <fog attach="fog" args={['#060609', 14, 34]} />

          <directionalLight position={[-6, 8, 6]} intensity={1.2} color="#e8eeff" castShadow shadow-bias={-0.0001} shadow-mapSize={[2048, 2048]} />
          <directionalLight position={[8, 4, 2]} intensity={0.3} color="#fff8f0" />
          <ambientLight intensity={0.1} color="#c8d0ff" />
          <spotLight position={[0, 6, 2.5]} angle={0.45} penumbra={0.8} intensity={1.6} color="#dde8ff" castShadow shadow-bias={-0.0001} />
          <spotLight position={[-8, 3, 1]} angle={0.6} penumbra={1} intensity={1.0} color="#7c8cff" />
          <spotLight position={[8, 3, 1]} angle={0.6} penumbra={1} intensity={0.7} color="#a78bfa" />

          <LibraryBackground />
          <InteractiveShelf />

          {visibleTools.map((tool, index) => {
            const xOffset = (index - (count - 1) / 2) * 1.1;
            return (
              <Book
                key={tool.id}
                tool={tool}
                position={[xOffset, 0.65, 0]}
                isSelected={selectedToolId === tool.id}
                onClick={onSelectTool}
              />
            );
          })}

          <Environment preset="night" background={false} />
          <CameraRig selectedToolId={selectedToolId} section={section} />
        </Suspense>
      </Canvas>
      <Loader
        containerStyles={{ background: '#050505' }}
        innerStyles={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        barStyles={{ backgroundColor: 'white' }}
        dataStyles={{ color: 'white', fontFamily: 'monospace' }}
      />
    </div>
  );
}
