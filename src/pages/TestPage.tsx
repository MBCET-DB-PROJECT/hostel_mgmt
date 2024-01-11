// TestPage.tsx
import React from "react";
import { Canvas } from "@react-three/fiber";
import Blob from "../components/Blob";
import MyIcosahedronGeometry from "../components/Blob/MyIcosahedronGeometry"; // Import the updated component

const TestPage = () => {
  return (
    <div className="container">
      <Canvas camera={{ position: [0.0, 0.0, 8.0] }}>
        <Blob />
        <MyIcosahedronGeometry args={[2, 20]} />{" "}
        {/* Use the updated component */}
      </Canvas>
    </div>
  );
};

export default TestPage;
