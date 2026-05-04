import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Icosahedron, Box, Torus, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// SPID: scudo istituzionale rotante
function SpidModel() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
  });
  return (
    <group>
      <Icosahedron ref={meshRef} args={[1.5, 1]}>
        <meshStandardMaterial color="#1d4ed8" wireframe />
      </Icosahedron>
      <Icosahedron args={[0.8, 1]}>
        <meshStandardMaterial color="#3b82f6" emissive="#1d4ed8" emissiveIntensity={0.5} />
      </Icosahedron>
    </group>
  );
}

// PEC: cubo tecnologico con griglia verde-indigo
function PecModel() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });
  return (
    <group ref={groupRef}>
      <Box args={[1.8, 1.8, 1.8]}>
        <meshStandardMaterial color="#1e1b4b" roughness={0.2} metalness={0.8} />
      </Box>
      <Box args={[1.9, 1.9, 1.9]}>
        <meshBasicMaterial color="#818cf8" wireframe />
      </Box>
    </group>
  );
}

// Email/Video: anelli concatenati (comunicazione)
function EmailModel() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.2;
      groupRef.current.rotation.y += delta * 0.4;
    }
  });
  return (
    <group ref={groupRef}>
      <Torus args={[0.7, 0.2, 16, 32]} position={[-1, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <meshStandardMaterial color="#059669" metalness={0.5} roughness={0.2} />
      </Torus>
      <Torus args={[0.7, 0.2, 16, 32]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#10b981" metalness={0.5} roughness={0.2} />
      </Torus>
      <Torus args={[0.7, 0.2, 16, 32]} position={[1, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <meshStandardMaterial color="#059669" metalness={0.5} roughness={0.2} />
      </Torus>
    </group>
  );
}

// Excel: sfera distorta con dati in movimento
function ExcelModel() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.z += delta * 0.1;
    }
  });
  return (
    <Sphere ref={meshRef} args={[1.4, 64, 64]}>
      <MeshDistortMaterial
        color="#15803d"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

export function Tool3DModel({ toolId }: { toolId: string }) {
  return (
    <div className="w-full h-full min-h-[300px] relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />

        {toolId === 'spid' && <SpidModel />}
        {toolId === 'pec' && <PecModel />}
        {toolId === 'email' && <EmailModel />}
        {toolId === 'excel' && <ExcelModel />}

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
      <div className="absolute bottom-4 right-4 text-xs text-white/40 font-mono pointer-events-none">
        TRASCINA PER RUOTARE
      </div>
    </div>
  );
}
