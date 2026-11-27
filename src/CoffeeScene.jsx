import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function Cup() {
  const group = useRef();
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, Math.sin(state.clock.elapsedTime * 0.35) * 0.16, 3, delta);
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -0.08 + Math.sin(state.clock.elapsedTime * 0.45) * 0.025, 3, delta);
    }
  });
  const cupProfile = [
    new THREE.Vector2(0.46, 0.04), new THREE.Vector2(0.52, 0.07),
    new THREE.Vector2(0.58, 0.2), new THREE.Vector2(0.69, 0.72),
    new THREE.Vector2(0.72, 0.91), new THREE.Vector2(0.7, 0.96),
    new THREE.Vector2(0.65, 0.96), new THREE.Vector2(0.63, 0.9),
    new THREE.Vector2(0.55, 0.25), new THREE.Vector2(0.48, 0.13)
  ];
  const saucerProfile = [new THREE.Vector2(0,0.04),new THREE.Vector2(.55,.04),new THREE.Vector2(.78,.07),new THREE.Vector2(.88,.12),new THREE.Vector2(.9,.16),new THREE.Vector2(.84,.19),new THREE.Vector2(.68,.13),new THREE.Vector2(.3,.11),new THREE.Vector2(0,.1)];
  return <group ref={group} position={[0, 0.12, 0]}>
    <mesh castShadow receiveShadow>
      <latheGeometry args={[cupProfile, 96]} />
      <meshPhysicalMaterial color="#d7c5a8" roughness={0.19} metalness={0.08} clearcoat={0.8} clearcoatRoughness={0.12} />
    </mesh>
    <mesh position={[0,0.92,0]} rotation={[-Math.PI/2,0,0]}>
      <circleGeometry args={[0.635,96]} />
      <meshStandardMaterial color="#382116" roughness={0.22} />
    </mesh>
    <mesh position={[0,0.936,0]} rotation={[-Math.PI/2,0,0]}>
      <circleGeometry args={[0.49,96]} />
      <meshStandardMaterial color="#8e4f27" roughness={0.24} />
    </mesh>
    <mesh position={[0.72,0.54,0]} rotation={[Math.PI/2,0,0]}>
      <torusGeometry args={[0.29,0.085,24,80,Math.PI*1.85]} />
      <meshPhysicalMaterial color="#d7c5a8" roughness={0.18} metalness={0.06} clearcoat={0.75} />
    </mesh>
    <mesh position={[0, -0.015, 0]} castShadow receiveShadow>
      <latheGeometry args={[saucerProfile, 96]} />
      <meshPhysicalMaterial color="#c8b18e" roughness={0.22} metalness={0.1} clearcoat={0.65} />
    </mesh>
    <mesh position={[0,0.055,0]}>
      <torusGeometry args={[0.54,0.012,12,96]} />
      <meshStandardMaterial color="#a66a36" metalness={0.75} roughness={0.25} />
    </mesh>
  </group>;
}

function Bean({ position, rotation = [0,0,0], scale = 1 }) {
  return <group position={position} rotation={rotation} scale={scale}>
    <mesh castShadow>
      <sphereGeometry args={[0.16,32,24]} />
      <meshStandardMaterial color="#5b2d18" roughness={0.34} />
    </mesh>
    <mesh rotation={[0,0,0.25]} position={[0,0.145,0]}>
      <torusGeometry args={[0.095,0.012,8,32,Math.PI]} />
      <meshStandardMaterial color="#b77a45" roughness={0.55} />
    </mesh>
  </group>;
}

function SceneObjects() {
  return <>
    <Float speed={1.05} rotationIntensity={0.12} floatIntensity={0.2}>
      <Cup />
    </Float>
    <Float speed={1.3} rotationIntensity={0.45} floatIntensity={0.5}><Bean position={[-1.1,0.7,0.1]} rotation={[0.3,0.2,-0.5]} scale={1.1}/></Float>
    <Float speed={1.1} rotationIntensity={0.5} floatIntensity={0.4}><Bean position={[1.15,-0.12,0.15]} rotation={[0.5,0.2,0.7]} scale={0.78}/></Float>
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.45}><Bean position={[0.9,1.1,-0.4]} rotation={[0.2,0.6,-0.2]} scale={0.62}/></Float>
    <ContactShadows position={[0,-0.78,0]} opacity={0.38} scale={4.5} blur={2.6} far={3}/>
  </>;
}

export default function CoffeeScene() {
  return <div className="coffee-scene" aria-label="Interactive three dimensional ceramic coffee cup">
    <Canvas shadows dpr={[1,1.6]} camera={{position:[0,0.25,4.5],fov:38}} gl={{alpha:true, antialias:true}} fallback={<div className="scene-fallback"><span>Q</span><small>QAVILO MENU EXPERIENCE</small></div>}>
      <ambientLight intensity={1.15}/>
      <directionalLight position={[-3,4,4]} intensity={2.4} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024}/>
      <pointLight position={[3,1,2]} intensity={32} color="#e6a65b" distance={7}/>
      <pointLight position={[-2,-1,-2]} intensity={14} color="#fff0d5" distance={6}/>
      <SceneObjects />
    </Canvas>
    <div className="scene-note"><span className="scene-dot"/> A menu experience made to be explored</div>
  </div>;
}
