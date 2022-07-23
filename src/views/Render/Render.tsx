import React, { useState } from "react";
import { useAppState } from "../../hooks/useAppState";
import WebGL from "./WebGL/WebGL";

const Render: React.FC = () => {
  const appState = useAppState();

  const [initialized, setInitialized] = useState(false);

  React.useEffect(() => {
    if (!initialized) {
      WebGL("webgl");
      setInitialized(true);
    }
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
