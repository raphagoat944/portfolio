import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Stars() {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const pos = new Float32Array(5000 * 3)
    for (let i = 0; i < 5000; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50
    }
    return pos
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x += 0.0002
    ref.current.rotation.y += 0.0002
    ref.current.rotation.x += state.pointer.y * 0.002
    ref.current.rotation.y += state.pointer.x * 0.002
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.2}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

export function SlickCanvas() {
  return (
    <div
      id="canvas-container"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0, // Dans le fond
        pointerEvents: 'none',
        background: 'transparent'
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 20], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <Stars />
      </Canvas>
    </div>
  )
}
