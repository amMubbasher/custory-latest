// src/components/Home/HeroBackground.jsx
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { AccumulativeShadows, RandomizedLight, Environment, Center, Float } from '@react-three/drei';
import { easing } from 'maath';
import * as THREE from 'three';

const RotatingObject = ({ color = "#ff6900" }) => {
  const mesh = useRef();
  
  useFrame((state, delta) => {
    mesh.current.rotation.x += delta * 0.2;
    mesh.current.rotation.y += delta * 0.3;
    easing.dampE(
      mesh.current.rotation,
      [0, state.pointer.x * 0.2, 0],
      0.3,
      delta
    );
  });

  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={mesh} castShadow>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

const FloatingParticles = ({ count = 100, color = "#ff6900" }) => {
  const mesh = useRef();
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const scale = 0.1 + Math.random() * 0.1;
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      temp.push({ scale, position: [x, y, z] });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    mesh.current.rotation.x += 0.001;
    mesh.current.rotation.y += 0.002;
  });

  return (
    <group ref={mesh}>
      {particles.map((data, i) => (
        <mesh key={i} position={data.position} scale={data.scale}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial color={color} transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
};

const Scene = () => {
  const shadowsRef = useRef();

  return (
    <>
      <color attach="background" args={['#f5f5f5']} />
      <Environment preset="city" />
      
      <AccumulativeShadows 
        ref={shadowsRef}
        temporal
        frames={60}
        alphaTest={0.85}
        scale={12}
        position={[0, -0.5, 0]}
        color="#ff6900"
        opacity={0.8}
      >
        <RandomizedLight 
          amount={8}
          radius={10}
          intensity={1}
          ambient={0.5}
          position={[5, 5, -10]}
        />
      </AccumulativeShadows>

      <Center>
        <RotatingObject />
        <FloatingParticles />
      </Center>
    </>
  );
};

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 opacity-70">
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 45 }}>
        <Scene />
      </Canvas>
    </div>
  );
};

export default HeroBackground;
