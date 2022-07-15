import * as React from "react";
import { useAppState } from "../../hooks/useAppState";
import WebGL from "./WebGL/WebGL";

const Render: React.FC = () => {
  const appState = useAppState();
  React.useEffect(() => {
    WebGL("webgl");
  });
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <canvas
        id="webgl"
        style={{ border: "1px solid black", width: "100%", height: "70%" }}
      />
    </div>
  );
};

export default Render;
