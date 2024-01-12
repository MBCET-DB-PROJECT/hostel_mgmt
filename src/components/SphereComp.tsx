/*import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial } from "three";

interface RotatingSphereProps {
  rotation: {
    x: number;
    y: number;
    z: number;
  };
}

const RotatingSphere: React.FC<RotatingSphereProps> = ({ rotation }) => {
  const sphereRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x += 0.01 * delta;
      sphereRef.current.rotation.y += 0.01 * delta;
    }
  });

  return (
    <mesh ref={sphereRef}>
      <bufferGeometry attach="geometry" args={[1, 32, 32]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
};

const ThreeJSPage = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <RotatingSphere rotation={{ x: 0, y: 0, z: 0 }} />
    </Canvas>
  );
};

const SphereComp = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThreeJSPage />
    </div>
  );
};

export default SphereComp;
*/
