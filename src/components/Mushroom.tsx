import { Html, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

export function Mushroom({ handleOpenModal }: { handleOpenModal: (index: number) => void }) {
    const { scene } = useGLTF('/models/morel.glb');
    const modelRef = useRef<THREE.Group>(null);

    useEffect(() => {
        if (modelRef.current) {
            modelRef.current.rotation.x = 0.2;
            modelRef.current.rotation.y = 0;
        }
    }, []);

    useEffect(() => {
        if (!modelRef.current) return;
        gsap.to(modelRef.current.rotation, {
            y: modelRef.current.rotation.y + 2 * Math.PI,
            duration: 16,
            ease: 'none',
            repeat: -1,
        });
    }, []);

    const markerPositions = [
        new THREE.Vector3(-0.8, 0, 0.8),
        new THREE.Vector3(0.8, 0, 0.8),
        new THREE.Vector3(0, 0, -1),
    ];

    return (
        <group ref={modelRef}>
            <primitive object={scene} scale={1} />

            {markerPositions.map((pos, i) => (
                <Html key={i} position={pos} center distanceFactor={2}>
                    <div
                        onClick={() => handleOpenModal(i)}
                        className="w-[100px] h-[100px] border-2 border-white rounded-[50%] hover:bg-white cursor-pointer flex items-center justify-center text-mono text-white font-bold transition-all active:scale-110 text-[50px] hover:text-black select-none"
                    >
                        {i + 1}
                    </div>
                </Html>
            ))}
        </group>
    );
}