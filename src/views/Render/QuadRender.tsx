import React, { useState } from "react";
import { useAppState } from "../../hooks/useAppState";
import QuadWebGL from "./WebGL/QuadWebGL";

const QuadRender: React.FC = () => {
  const appState = useAppState();

  const [initialized, setInitialized] = useState(false);

  React.useEffect(() => {
    if (!initialized) {
      QuadWebGL("quadwebgl");
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
        id="quadwebgl"
        style={{ border: "1px solid black", width: "100%", height: "70%" }}
      />
    </div>
  );
};

export default QuadRender;
