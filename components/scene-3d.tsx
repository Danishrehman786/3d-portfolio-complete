"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import type * as THREE from "three"

function AnimatedSphere() {
  const ref = useRef<THREE.Points>(null!)

  // Generate fewer points for better performance
  const sphere = useMemo(() => {
    const positions = new Float32Array(2000 * 3)
    for (let i = 0; i < 2000; i++) {
      const radius = Math.random() * 15 + 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
    }
    return positions
  }, [])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 20
      ref.current.rotation.y -= delta / 30
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#06b6d4" size={0.03} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  )
}

function FloatingCubes() {
  const cubes = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (cubes.current) {
      cubes.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
      cubes.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  // Reduce number of cubes for better performance
  const cubePositions = useMemo(() => {
    return Array.from({ length: 8 }, () => ({
      position: [(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
      color: Math.random() > 0.5 ? "#8b5cf6" : "#06b6d4",
    }))
  }, [])

  return (
    <group ref={cubes}>
      {cubePositions.map((cube, i) => (
        <mesh
          key={i}
          position={cube.position as [number, number, number]}
          rotation={cube.rotation as [number, number, number]}
        >
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial
            color={cube.color}
            transparent
            opacity={0.4}
            emissive={cube.color}
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <AnimatedSphere />
      <FloatingCubes />
    </>
  )
}
