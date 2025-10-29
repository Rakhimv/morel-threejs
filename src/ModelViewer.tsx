import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense } from 'react'

function Model({ url }: { url: string }) {
  const gltf = useGLTF(url)
  
  return (
    <primitive 
      object={gltf.scene} 
      scale={0.5}
      position={[0, -1, 0]}
    />
  )
}

function Sphere() {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  )
}

export default function ModelViewer() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      <Suspense fallback={null}>
        <Model url="/models/suzanne.glb" />
      </Suspense>
      
      <Sphere />
      
      <OrbitControls />
    </Canvas>
  )
}