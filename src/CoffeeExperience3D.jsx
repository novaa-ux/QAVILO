import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function CupModel() {
  const cup = useRef();
  const beans = useRef();
  const cupProfile = useMemo(() => [
    new THREE.Vector2(0.48, 0), new THREE.Vector2(0.53, 0.06),
    new THREE.Vector2(0.68, 0.78), new THREE.Vector2(0.72, 0.9),
    new THREE.Vector2(0.7, 0.94)
  ], []);
  useFrame((state, delta) => {
    const section = document.getElementById('qavilo-3d-experience');
    let progress = 0;
    if (section) {
      const rect = section.getBoundingClientRect();
      progress = THREE.MathUtils.clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0, 1);
    }
    if (cup.current) {
      cup.current.rotation.y = THREE.MathUtils.damp(cup.current.rotation.y, -0.35 + progress * 1.15 + state.pointer.x * 0.18, 4, delta);
      cup.current.rotation.z = THREE.MathUtils.damp(cup.current.rotation.z, state.pointer.y * 0.08, 4, delta);
      cup.current.position.y = -0.12 + Math.sin(state.clock.elapsedTime * 0.7) * 0.045 + progress * 0.12;
    }
    if (beans.current) beans.current.rotation.y += delta * 0.12;
  });
  return <group>
    <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.22}>
      <group ref={cup} position={[0, -0.1, 0]}>
        <mesh position={[0, -0.52, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.05, 1.05, 0.1, 96]} />
          <meshStandardMaterial color="#5B2C1B" metalness={0.55} roughness={0.28} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <latheGeometry args={[cupProfile, 96]} />
          <meshPhysicalMaterial color="#E8D3B3" roughness={0.18} metalness={0.08} clearcoat={0.9} clearcoatRoughness={0.12} />
        </mesh>
        <mesh position={[0, 0.82, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.675, 0.675, 0.035, 96]} />
          <meshPhysicalMaterial color="#6D351F" roughness={0.22} metalness={0.08} />
        </mesh>
        <mesh position={[0, 0.845, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.58, 0.025, 12, 80]} />
          <meshStandardMaterial color="#D99B54" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.73, 0.24, 0]} rotation={[Math.PI / 2, 0, 0.15]}>
          <torusGeometry args={[0.34, 0.09, 24, 80, Math.PI * 1.8]} />
          <meshPhysicalMaterial color="#E8D3B3" roughness={0.18} clearcoat={0.9} />
        </mesh>
        <mesh position={[0, -0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.52, 0.018, 12, 80]} />
          <meshStandardMaterial color="#F0B968" metalness={0.85} roughness={0.18} />
        </mesh>
      </group>
    </Float>
    <group ref={beans}>
      {Array.from({ length: 9 }, (_, i) => {
        const angle = (i / 9) * Math.PI * 2;
        const radius = 1.42 + (i % 3) * 0.12;
        return <group key={i} position={[Math.cos(angle) * radius, Math.sin(angle * 2) * 0.46, Math.sin(angle) * radius * 0.55]} rotation={[0.4 + i * 0.2, angle, 0.5]}>
          <mesh scale={[0.14, 0.2, 0.09]}>
            <sphereGeometry args={[1, 24, 18]} />
            <meshStandardMaterial color={i % 2 ? '#6B351F' : '#9A542B'} roughness={0.32} metalness={0.12} />
          </mesh>
          <mesh scale={[0.025, 0.17, 0.025]} rotation={[0, 0, -0.25]}>
            <capsuleGeometry args={[0.5, 1, 4, 8]} />
            <meshStandardMaterial color="#D59A5B" roughness={0.5} />
          </mesh>
        </group>;
      })}
    </group>
    <ContactShadows position={[0, -1.12, 0]} opacity={0.42} scale={5} blur={2.8} far={3} />
  </group>;
}

export default function CoffeeExperience3D() {
  return <section className="qavilo-3d" id="qavilo-3d-experience">
    <div className="qavilo-3d-copy">
      <span className="eyebrow">CRAFT, IN EVERY DETAIL</span>
      <h2>More than a drink.<br/><em>A whole experience.</em></h2>
      <p>From the first aroma to the final detail, the best café experiences are built with intention. Your digital menu should feel the same.</p>
      <span className="qavilo-3d-scroll"><i/> SCROLL TO EXPLORE</span>
    </div>
    <div className="qavilo-3d-stage" aria-label="Interactive three-dimensional ceramic coffee cup with floating coffee beans">
      <Canvas camera={{ position: [0, 0.2, 5.2], fov: 36 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={1.15} />
        <directionalLight position={[4, 5, 4]} intensity={2.2} color="#FFE0AE" />
        <pointLight position={[-3, 1, 2]} intensity={30} color="#D87935" />
        <pointLight position={[2, -1, -3]} intensity={18} color="#F5C783" />
        <Suspense fallback={null}><CupModel /></Suspense>
      </Canvas>
      <div className="qavilo-3d-orbit orbit-one"/><div className="qavilo-3d-orbit orbit-two"/>
      <span className="qavilo-3d-stamp">Q / 01</span>
    </div>
  </section>;
}
