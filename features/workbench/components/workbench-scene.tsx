"use client";

import { Edges, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { LaptopModule } from "@/features/workbench/components/laptop-module";
import { CHASSIS } from "@/features/workbench/lib/module-layout";
import { MODULE_TYPES } from "@/lib/constants/modules";
import { useWorkbenchStore } from "@/stores/workbench-store";

export default function WorkbenchScene() {
  const hiddenModules = useWorkbenchStore((s) => s.hiddenModules);
  const selectModule = useWorkbenchStore((s) => s.selectModule);

  return (
    <Canvas
      camera={{ position: [3.6, 3.2, 4.4], fov: 40 }}
      dpr={[1, 2]}
      onPointerMissed={() => selectModule(null)}
    >
      <color attach="background" args={["#F5F4F0"]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 3]} intensity={1.6} />
      <directionalLight position={[-4, 3, -2]} intensity={0.4} />
      {/* Cutting-mat grid in the panel border and secondary surface tones. */}
      <gridHelper args={[12, 24, "#D8D6CE", "#ECEAE2"]} position-y={-0.001} />

      <mesh position={CHASSIS.position}>
        <boxGeometry args={CHASSIS.size} />
        <meshStandardMaterial color="#B8B6AE" roughness={0.7} metalness={0.2} />
        <Edges color="#1A1B1E" />
      </mesh>
      {MODULE_TYPES.filter((type) => !hiddenModules.includes(type)).map((type) => (
        <LaptopModule key={type} type={type} />
      ))}

      <OrbitControls
        makeDefault
        target={[0, 0.5, 0]}
        enablePan={false}
        minDistance={3}
        maxDistance={10}
        maxPolarAngle={Math.PI / 2 - 0.05}
      />
    </Canvas>
  );
}
