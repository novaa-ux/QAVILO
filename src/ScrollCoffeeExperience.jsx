import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollCoffeeExperience.css';

gsap.registerPlugin(ScrollTrigger);

const copper = '#C96B35';
const champagne = '#EBC58B';
const dark = '#21120D';

function RoundedPanel({ args=[1,1,1], radius=.08, ...props }) {
  const geometry = useMemo(() => {
    const [w,h,d] = args;
    const s = new THREE.Shape();
    const x=-w/2, y=-h/2;
    s.moveTo(x+radius,y); s.lineTo(x+w-radius,y); s.quadraticCurveTo(x+w,y,x+w,y+radius);
    s.lineTo(x+w,y+h-radius); s.quadraticCurveTo(x+w,y+h,x+w-radius,y+h);
    s.lineTo(x+radius,y+h); s.quadraticCurveTo(x,y+h,x,y+h-radius);
    s.lineTo(x,y+radius); s.quadraticCurveTo(x,y,x+radius,y);
    const g = new THREE.ExtrudeGeometry(s,{depth:d,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.025,bevelThickness:.025,curveSegments:8});
    g.translate(0,0,-d/2); return g;
  }, [args[0],args[1],args[2],radius]);
  return <mesh geometry={geometry} {...props}/>;
}

function Gauge({position,rotation=[0,0,0]}) {
  const needle=useRef();
  useFrame(({clock})=>{ if(needle.current) needle.current.rotation.z=-.45+Math.sin(clock.elapsedTime*.8)*.09; });
  return <group position={position} rotation={rotation}>
    <mesh><cylinderGeometry args={[.17,.17,.055,40]}/><meshStandardMaterial color="#171310" metalness={.65} roughness={.28}/></mesh>
    <mesh position={[0,0,.034]}><circleGeometry args={[.145,40]}/><meshStandardMaterial color="#F3E5CF" roughness={.55}/></mesh>
    <mesh position={[0,0,.041]}><torusGeometry args={[.153,.018,10,40]}/><meshStandardMaterial color="#C5A16F" metalness={.85} roughness={.2}/></mesh>
    <mesh ref={needle} position={[0,0,.052]}><boxGeometry args={[.012,.105,.009]}/><meshStandardMaterial color="#9B3F20" metalness={.3}/></mesh>
    <mesh position={[0,0,.06]}><sphereGeometry args={[.018,12,12]}/><meshStandardMaterial color="#A77B4D" metalness={.8}/></mesh>
  </group>;
}

function EspressoMachine({progress}) {
  const root=useRef(), streamA=useRef(), streamB=useRef(), steam=useRef([]);
  useFrame(({clock},delta)=>{
    const p=progress.current, t=clock.elapsedTime;
    if(root.current){
      root.current.visible=p<.48;
      root.current.position.x=THREE.MathUtils.damp(root.current.position.x,p<.35?-.2:-2.8,4,delta);
      root.current.rotation.y=Math.sin(t*.22)*.035;
    }
    [streamA,streamB].forEach((r,i)=>{if(r.current){const amount=THREE.MathUtils.clamp((p-.12-i*.035)/.22,0,1);r.current.scale.y=amount*(.94+Math.sin(t*17+i)*.025);r.current.visible=p>.12&&p<.49;}});
    steam.current.forEach((m,i)=>{if(m){m.visible=p>.2&&p<.48; m.position.y=1.25+((t*.24+i*.23)%1)*.65; m.position.x=-.55+Math.sin(t*1.4+i)*.1; m.material.opacity=.25+Math.sin(t*2+i)*.1;}});
  });
  const steel=<meshStandardMaterial color="#AEB4B5" metalness={.92} roughness={.22}/>;
  return <group ref={root} position={[-.2,0,0]}>
    {/* brushed stainless commercial body */}
    <RoundedPanel args={[2.7,1.55,.82]} radius={.13} position={[0,.55,0]} castShadow receiveShadow><meshStandardMaterial color="#8D9698" metalness={.88} roughness={.25}/></RoundedPanel>
    <RoundedPanel args={[2.78,.12,.9]} radius={.04} position={[0,1.38,0]}><meshStandardMaterial color="#28201A" metalness={.7} roughness={.24}/></RoundedPanel>
    <RoundedPanel args={[2.85,.16,1.04]} radius={.04} position={[0,-.27,.03]}><meshStandardMaterial color="#C17B43" metalness={.82} roughness={.22}/></RoundedPanel>
    <mesh position={[0,1.49,0]}><boxGeometry args={[2.55,.07,.68]}/><meshStandardMaterial color="#B5A18A" metalness={.7} roughness={.3}/></mesh>
    {/* cup warmer rails */}
    {[ -.3,0,.3 ].map((z,i)=><mesh key={i} position={[0,1.55,z]}><boxGeometry args={[2.55,.035,.025]}/><meshStandardMaterial color="#D8C4A3" metalness={.85}/></mesh>)}
    {/* front black control fascia */}
    <RoundedPanel args={[2.38,.43,.045]} radius={.04} position={[0,.88,.43]}><meshStandardMaterial color="#211A16" metalness={.5} roughness={.3}/></RoundedPanel>
    <mesh position={[0,.9,.47]}><boxGeometry args={[.54,.22,.025]}/><meshStandardMaterial color="#172C2B" emissive="#254D46" emissiveIntensity={.45} metalness={.4}/></mesh>
    <mesh position={[0,.9,.49]}><boxGeometry args={[.38,.012,.008]}/><meshBasicMaterial color="#D5B77F"/></mesh>
    {[ -.82,-.58,.58,.82 ].map((x,i)=><group key={i} position={[x,.9,.49]}>
      <mesh><cylinderGeometry args={[.055,.055,.045,24]}/><meshStandardMaterial color={i%2? '#D4B17C':'#6E7778'} metalness={.85}/></mesh>
      <mesh position={[0,0,.028]}><circleGeometry args={[.025,20]}/><meshStandardMaterial color="#21120D" metalness={.4}/></mesh>
    </group>)}
    <Gauge position={[-.92,1.17,.47]} rotation={[Math.PI/2,0,0]}/>
    <Gauge position={[.92,1.17,.47]} rotation={[Math.PI/2,0,0]}/>
    {/* twin brew groups, collars, portafilters and spouts */}
    {[-.62,.62].map((x,i)=><group key={i} position={[x,.28,.5]}>
      <mesh rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.22,.19,.22,48]}/><meshStandardMaterial color="#D0D4D1" metalness={.95} roughness={.16}/></mesh>
      <mesh position={[0,-.13,.03]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.18,.035,12,40]}/><meshStandardMaterial color="#4B4A46" metalness={.8}/></mesh>
      <mesh position={[0,-.25,.13]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.07,.08,.13,32]}/><meshStandardMaterial color="#B2B8B6" metalness={.9}/></mesh>
      <mesh position={[0,-.35,.2]} rotation={[0,0,.15]}><cylinderGeometry args={[.045,.065,.42,24]}/><meshStandardMaterial color="#49301F" roughness={.32}/></mesh>
      <mesh position={[0,-.54,.21]}><sphereGeometry args={[.055,20,16]}/><meshStandardMaterial color="#302018" roughness={.3}/></mesh>
    </group>)}
    {/* steam wand and hot water tap */}
    <mesh position={[1.22,.12,.42]} rotation={[0,0,-.15]}><cylinderGeometry args={[.035,.045,.78,20]}/><meshStandardMaterial color="#D5D9D6" metalness={.95} roughness={.16}/></mesh>
    <mesh position={[1.27,-.28,.43]} rotation={[0,0,-.15]}><cylinderGeometry args={[.025,.025,.13,16]}/><meshStandardMaterial color="#AAB1B0" metalness={.9}/></mesh>
    <mesh position={[-1.2,.12,.43]} rotation={[0,0,.16]}><cylinderGeometry args={[.035,.045,.7,20]}/><meshStandardMaterial color="#D5D9D6" metalness={.95}/></mesh>
    {/* slotted drip tray */}
    <mesh position={[0,-.2,.58]}><boxGeometry args={[2.3,.055,.36]}/><meshStandardMaterial color="#292522" metalness={.75} roughness={.3}/></mesh>
    {Array.from({length:17},(_,i)=><mesh key={i} position={[-1.02+i*.128,-.166,.59]}><boxGeometry args={[.018,.008,.27]}/><meshStandardMaterial color="#A9A19A" metalness={.8}/></mesh>)}
    {/* feet */}
    {[-1,1].map(x=>[-.27,.27].map(z=><mesh key={`${x}${z}`} position={[x*1.12,-.39,z]}><cylinderGeometry args={[.09,.09,.16,20]}/><meshStandardMaterial color="#171411" roughness={.8}/></mesh>))}
    {/* crema falling from both group heads */}
    <mesh ref={streamA} position={[-.62,-.27,.73]}><cylinderGeometry args={[.012,.022,.8,16]}/><meshStandardMaterial color="#9A4A21" emissive="#6C2B10" emissiveIntensity={.5}/></mesh>
    <mesh ref={streamB} position={[.62,-.27,.73]}><cylinderGeometry args={[.012,.022,.8,16]}/><meshStandardMaterial color="#9A4A21" emissive="#6C2B10" emissiveIntensity={.5}/></mesh>
    {Array.from({length:7},(_,i)=><mesh key={i} ref={el=>steam.current[i]=el} visible={false} position={[-.55,1.3+i*.08,.25]}><sphereGeometry args={[.09+i*.008,16,12]}/><meshBasicMaterial color="#FFF0D5" transparent opacity={.3}/></mesh>)}
    {/* espresso cups sitting on top */}
    {[-.78,.78].map(x=><CupModel key={x} position={[x,1.65,.02]} scale={.45}/>)}
  </group>;
}

function CupModel({position=[0,0,0],scale=1,glass=false}) {
  const profile=useMemo(()=>{const pts=[new THREE.Vector2(.19,0),new THREE.Vector2(.23,.025),new THREE.Vector2(.29,.34),new THREE.Vector2(.3,.37),new THREE.Vector2(.27,.37),new THREE.Vector2(.25,.33),new THREE.Vector2(.21,.06),new THREE.Vector2(.18,.04)];return new THREE.LatheGeometry(pts,48);},[]);
  return <group position={position} scale={scale}>
    <mesh geometry={profile} castShadow><meshPhysicalMaterial color={glass?'#DDE8E3':'#F3E8D6'} roughness={glass?.1:.24} metalness={.05} transparent={glass} opacity={glass?.3:1} side={THREE.DoubleSide}/></mesh>
    <mesh position={[0,.29,0]}><cylinderGeometry args={[.255,.225,.035,48]}/><meshStandardMaterial color="#4A2113" roughness={.22}/></mesh>
    <mesh position={[0,.31,0]}><circleGeometry args={[.24,48]}/><meshStandardMaterial color="#A75B2A" roughness={.24}/></mesh>
    <mesh position={[0,.322,0]}><circleGeometry args={[.19,48]}/><meshStandardMaterial color="#D9A56B" roughness={.3}/></mesh>
    <mesh position={[.29,.19,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.12,.035,12,32,Math.PI*1.7]}/><meshStandardMaterial color={glass?'#DDE8E3':'#F3E8D6'} roughness={.2}/></mesh>
  </group>;
}

function Saucer({position=[0,0,0],scale=1}) {
 return <mesh position={position} scale={scale}><cylinderGeometry args={[.43,.38,.045,64]}/><meshStandardMaterial color="#E9D7B9" roughness={.24}/></mesh>;
}

function CoffeeCupScene({progress}) {
 const root=useRef(), stream=useRef(), splash=useRef([]);
 useFrame(({clock},delta)=>{
  const p=progress.current, t=clock.elapsedTime;
  if(root.current){root.current.visible=p>.2&&p<.62;root.current.position.x=THREE.MathUtils.damp(root.current.position.x,p<.48?.45:2.8,4,delta);root.current.rotation.y=Math.sin(t*.55)*.08;}
  if(stream.current){const v=THREE.MathUtils.clamp((p-.28)/.16,0,1);stream.current.scale.y=v*(1+Math.sin(t*16)*.035);stream.current.visible=p>.28&&p<.5;}
  splash.current.forEach((m,i)=>{if(m){m.visible=p>.34&&p<.53;const a=t*1.6+i*2.4;m.position.set(.45+Math.sin(a)*(.28+i*.025),.15+Math.abs(Math.sin(a*1.7))*.5,Math.cos(a)*.2);}});
 });
 return <group ref={root} position={[.45,-.4,0]}>
  <mesh position={[0,-.27,0]}><cylinderGeometry args={[.52,.52,.09,64]}/><meshStandardMaterial color="#A66B3E" metalness={.7} roughness={.24}/></mesh>
  <CupModel position={[0,-.2,0]} scale={1.25}/>
  <mesh ref={stream} position={[0,.55,0]} scale={[1,0,1]}><cylinderGeometry args={[.025,.035,.9,20]}/><meshStandardMaterial color="#6E2C14" emissive="#9A4B21" emissiveIntensity={.6}/></mesh>
  {Array.from({length:12},(_,i)=><mesh key={i} ref={el=>splash.current[i]=el} visible={false}><sphereGeometry args={[.035+(i%3)*.012,14,12]}/><meshStandardMaterial color="#B96830" metalness={.2} roughness={.18}/></mesh>)}
 </group>;
}

function IcedCoffee({progress}) {
 const root=useRef(), cubes=useRef([]);
 useFrame(({clock},delta)=>{
  const p=progress.current,t=clock.elapsedTime;
  if(root.current){root.current.visible=p>.47&&p<.72;root.current.position.x=THREE.MathUtils.damp(root.current.position.x,p<.62?.15:2.7,4,delta);root.current.rotation.y=Math.sin(t*.35)*.12;}
  cubes.current.forEach((m,i)=>{if(m){m.rotation.x=Math.sin(t*.7+i)*.12;m.rotation.y=t*.16+i; m.position.y=.26+Math.sin(t*1.1+i)*.025;}});
 });
 const glassProfile=useMemo(()=>new THREE.LatheGeometry([new THREE.Vector2(.28,-.55),new THREE.Vector2(.34,-.5),new THREE.Vector2(.43,.48),new THREE.Vector2(.44,.53),new THREE.Vector2(.42,.55),new THREE.Vector2(.4,.48),new THREE.Vector2(.31,-.48)],64),[]);
 return <group ref={root} position={[.15,-.12,0]}>
  <mesh position={[0,-.7,0]}><cylinderGeometry args={[.55,.55,.08,64]}/><meshStandardMaterial color="#9A6237" metalness={.65} roughness={.25}/></mesh>
  <mesh geometry={glassProfile} castShadow><meshPhysicalMaterial color="#D9E8E5" roughness={.08} metalness={.05} transparent opacity={.28} side={THREE.DoubleSide}/></mesh>
  <mesh position={[0,-.13,0]}><cylinderGeometry args={[.37,.31,.82,64]}/><meshStandardMaterial color="#6E351D" roughness={.16}/></mesh>
  <mesh position={[0,.17,0]}><cylinderGeometry args={[.405,.37,.2,64]}/><meshStandardMaterial color="#C18A55" roughness={.2}/></mesh>
  <mesh position={[0,.29,0]}><cylinderGeometry args={[.41,.405,.08,64]}/><meshStandardMaterial color="#E9D2AF" roughness={.18}/></mesh>
  {Array.from({length:7},(_,i)=><mesh key={i} ref={el=>cubes.current[i]=el} position={[-.2+(i%3)*.2,.28+Math.floor(i/3)*.13,.1]} rotation={[.2,i*.4,.2]}><boxGeometry args={[.17,.17,.17]}/><meshPhysicalMaterial color="#E9F4F2" roughness={.08} metalness={.03} transparent opacity={.76} clearcoat={.8}/></mesh>)}
  <mesh position={[.12,.62,0]} rotation={[0,0,-.08]}><cylinderGeometry args={[.024,.024,.92,16]}/><meshStandardMaterial color="#C87942" metalness={.3} roughness={.3}/></mesh>
  <mesh position={[0,.57,0]}><torusGeometry args={[.43,.018,10,64]}/><meshStandardMaterial color="#F1D9B4" metalness={.4}/></mesh>
 </group>;
}

function MatchaScene({progress}) {
 const root=useRef(), whisk=useRef();
 useFrame(({clock},delta)=>{const p=progress.current,t=clock.elapsedTime;if(root.current){root.current.visible=p>.68&&p<.86;root.current.position.x=THREE.MathUtils.damp(root.current.position.x,p<.8?0:2.8,4,delta);root.current.rotation.y=Math.sin(t*.4)*.08;}if(whisk.current)whisk.current.rotation.z=Math.sin(t*1.5)*.07;});
 const bowl=useMemo(()=>new THREE.LatheGeometry([new THREE.Vector2(.08,-.2),new THREE.Vector2(.35,-.19),new THREE.Vector2(.52,-.06),new THREE.Vector2(.6,.1),new THREE.Vector2(.58,.16),new THREE.Vector2(.54,.11),new THREE.Vector2(.45,-.03),new THREE.Vector2(.08,-.08)],64),[]);
 return <group ref={root} position={[0,-.25,0]}>
  <mesh geometry={bowl} castShadow><meshPhysicalMaterial color="#D5B58A" roughness={.25} metalness={.05} side={THREE.DoubleSide}/></mesh>
  <mesh position={[0,.08,0]}><cylinderGeometry args={[.53,.53,.035,64]}/><meshStandardMaterial color="#6E874A" roughness={.3}/></mesh>
  <mesh position={[0,.103,0]}><circleGeometry args={[.49,64]}/><meshStandardMaterial color="#7D9952" roughness={.25}/></mesh>
  <group ref={whisk} position={[.35,.35,.08]} rotation={[0,0,-.65]}>
    <mesh position={[0,.3,0]}><cylinderGeometry args={[.035,.035,.72,16]}/><meshStandardMaterial color="#CDAA73" roughness={.5}/></mesh>
    {Array.from({length:13},(_,i)=><mesh key={i} position={[-.13+i*.022,-.12,0]} rotation={[0,0,(i-6)*.035]}><cylinderGeometry args={[.006,.008,.3,8]}/><meshStandardMaterial color="#D6BD91" roughness={.7}/></mesh>)}
  </group>
  <mesh position={[-.75,-.03,0]} rotation={[0,0,.08]}><cylinderGeometry args={[.09,.11,.36,32]}/><meshStandardMaterial color="#8B5B32" roughness={.7}/></mesh>
  <mesh position={[-.75,.17,0]}><cylinderGeometry args={[.1,.1,.04,32]}/><meshStandardMaterial color="#D8C19A" roughness={.7}/></mesh>
  {Array.from({length:24},(_,i)=><mesh key={i} position={[-.75+Math.sin(i*8)*.12,.22+Math.cos(i*4)*.08,Math.sin(i*3)*.12]}><sphereGeometry args={[.012,8,8]}/><meshStandardMaterial color="#8DA35D" roughness={.8}/></mesh>)}
 </group>;
}

function Patisserie({progress}) {
 const root=useRef();
 useFrame(({clock},delta)=>{const p=progress.current;if(root.current){root.current.visible=p>.84;root.current.position.x=THREE.MathUtils.damp(root.current.position.x,p>.84?0:3,4,delta);root.current.rotation.y=clock.elapsedTime*.16;}});
 const wedge=useMemo(()=>{const s=new THREE.Shape();s.moveTo(-.48,-.38);s.lineTo(.48,-.38);s.lineTo(0,.5);s.closePath();return new THREE.ExtrudeGeometry(s,{depth:.45,bevelEnabled:true,bevelSegments:3,bevelSize:.025,bevelThickness:.025});},[]);
 return <group ref={root} position={[0,-.5,0]}>
  <mesh position={[0,-.24,0]}><cylinderGeometry args={[.95,.95,.1,64]}/><meshStandardMaterial color="#C18A55" metalness={.55} roughness={.25}/></mesh>
  <mesh geometry={wedge} position={[0,-.08,0]} castShadow><meshStandardMaterial color="#E8C99B" roughness={.34}/></mesh>
  <mesh geometry={wedge} position={[0,-.08,.11]} scale={[.99,.98,.48]}><meshStandardMaterial color="#F3E0C2" roughness={.32}/></mesh>
  <mesh position={[0,.17,.05]} rotation={[0,0,0]}><boxGeometry args={[.83,.07,.37]}/><meshStandardMaterial color="#A84E2B" roughness={.24}/></mesh>
  <mesh position={[0,.22,.05]}><boxGeometry args={[.79,.035,.34]}/><meshStandardMaterial color="#E6B66F" roughness={.25}/></mesh>
  {[-.23,0,.23].map((x,i)=><mesh key={i} position={[x,.28,.08]}><sphereGeometry args={[.055,18,14]}/><meshStandardMaterial color={i===1?'#B74E28':'#C87B38'} roughness={.22}/></mesh>)}
  <mesh position={[0,-.15,-.3]} rotation={[0,0,-.2]}><torusGeometry args={[.13,.055,12,28,Math.PI*1.25]}/><meshStandardMaterial color="#B77842" roughness={.45}/></mesh>
 </group>;
}

function FloatingBeans({progress}) {
 const refs=useRef([]);
 useFrame(({clock})=>refs.current.forEach((m,i)=>{if(m){m.rotation.x=clock.elapsedTime*.35+i;m.rotation.z=clock.elapsedTime*.25+i;m.position.y=Math.sin(clock.elapsedTime*.7+i)*.12+((i%3)-1)*.28;m.visible=progress.current<.52;}}));
 return <group>{Array.from({length:15},(_,i)=><mesh key={i} ref={el=>refs.current[i]=el} position={[(i%5-2)*.8,((i%3)-1)*.35,-.6-(i%4)*.2]} rotation={[.4,i,.7]} scale={[.12,.075,.045]}><sphereGeometry args={[1,18,12]}/><meshStandardMaterial color={i%2?'#6E321A':'#A65B2D'} roughness={.55}/></mesh>)}</group>;
}

function Scene({progress}) {
 return <>
  <color attach="background" args={['#21120D']}/>
  <fog attach="fog" args={['#21120D',7,15]}/>
  <ambientLight intensity={.8}/>
  <directionalLight position={[4,7,5]} intensity={3.2} color="#FFE0B0" castShadow/>
  <spotLight position={[-4,5,4]} intensity={85} angle={.55} penumbra={.7} color="#D8793B"/>
  <pointLight position={[3,1,-2]} intensity={22} color="#FFC36A" distance={10}/>
  <pointLight position={[-3,0,3]} intensity={15} color="#9E4821" distance={8}/>
  <mesh position={[0,-1.42,-1]} rotation={[-Math.PI/2,0,0]} receiveShadow><planeGeometry args={[18,18]}/><meshStandardMaterial color="#352016" roughness={.38} metalness={.25}/></mesh>
  <mesh position={[0,-1.39,-.7]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[2.2,3.8,80]}/><meshBasicMaterial color="#B45D2B" transparent opacity={.12}/></mesh>
  <FloatingBeans progress={progress}/>
  <EspressoMachine progress={progress}/>
  <CoffeeCupScene progress={progress}/>
  <IcedCoffee progress={progress}/>
  <MatchaScene progress={progress}/>
  <Patisserie progress={progress}/>
 </>;
}

export default function ScrollCoffeeExperience() {
 const section=useRef(null), progress=useRef(0), copy=useRef([]), progressLine=useRef(null);
 useEffect(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctx=gsap.context(()=>{
   const trigger=ScrollTrigger.create({
    trigger:section.current,start:'top top',end:'+=4700',pin:!reduced,scrub:1.05,
    onUpdate:self=>{
     progress.current=self.progress;
     const idx=Math.min(4,Math.floor(self.progress*5));
     copy.current.forEach((el,i)=>{if(el)gsap.to(el,{opacity:i===idx?1:0,y:i===idx?0:24,duration:.24,overwrite:true});});
     if(progressLine.current)gsap.set(progressLine.current,{scaleX:self.progress,transformOrigin:'left center'});
    }
   });
   return ()=>trigger.kill();
  },section);
  return ()=>ctx.revert();
 },[]);
 const chapters=[
  ['01 — THE MACHINE','Built for the ritual.','A polished two-group espresso machine enters the light. Steel, brass, gauges and portafilters — every detail has a purpose.'],
  ['02 — EXTRACTION','The first drop.','The group heads engage. Espresso streams into porcelain while crema and coffee droplets catch the light.'],
  ['03 — OVER ICE','A cooler kind of craft.','A crystal-clear glass, layered coffee, ice cubes and a warm amber pour take over the counter.'],
  ['04 — MATCHA RITUAL','Slow down. Whisk well.','A ceramic bowl, bamboo whisk and vivid matcha powder bring a quieter rhythm to the scene.'],
  ['05 — THE FINISH','A little piece of theatre.','A plated patisserie moment closes the sequence — composed, tactile and unmistakably QAVILO.']
 ];
 return <section className="qavilo-scroll-story" ref={section}>
  <div className="qavilo-story-canvas"><Canvas shadows dpr={[1,1.5]} camera={{position:[0,1.25,7.2],fov:34}} gl={{antialias:true,alpha:false,powerPreference:'high-performance'}} fallback={<div className="qavilo-canvas-fallback"><span>QAVILO / THE CRAFT IN MOTION</span><strong>Real craft.<br/>Real presence.</strong><p>Espresso · Iced coffee · Matcha · Patisserie</p></div>}><Scene progress={progress}/></Canvas></div>
  <div className="qavilo-story-vignette"/>
  <div className="qavilo-story-heading"><span>QAVILO / THE CRAFT IN MOTION</span><b>OBJECTS WITH CHARACTER.<br/>MOMENTS WITH MOVEMENT.</b></div>
  <div className="qavilo-story-copy">{chapters.map((c,i)=><article key={c[0]} ref={el=>copy.current[i]=el}><span>{c[0]}</span><h2>{c[1]}</h2><p>{c[2]}</p></article>)}</div>
  <div className="qavilo-story-footer"><span>SCROLL TO EXPLORE</span><div><i ref={progressLine}/></div><b>0{i+1}</b></div>
  <div className="qavilo-story-side-label">THE QAVILO EXPERIENCE — EST. IN DETAIL</div>
 </section>;
}
