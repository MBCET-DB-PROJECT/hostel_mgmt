// MyIcosahedronGeometry.tsx
import React from "react";
import { IcosahedronGeometry } from "three";
import { extend, useFrame, useThree } from "@react-three/fiber";

extend({ IcosahedronGeometry }); // Register the geometry

function MyIcosahedronGeometry(props: { args: [number, number] }) {
  const ref = React.useRef();

  useFrame(() => {
    // Your animation or other logic here, if needed
  });

  return (
    <primitive
      object={new IcosahedronGeometry(props.args[0], props.args[1])}
      attach="geometry"
      ref={ref}
    />
  );
}

export default MyIcosahedronGeometry;
