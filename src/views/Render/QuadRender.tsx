import * as React from "react";
import { useAppState } from "../../hooks/useAppState";
import QuadWebGL from "./WebGL/QuadWebGL";

const QuadRender: React.FC = () => {
  const appState = useAppState();
  React.useEffect(() => {
    QuadWebGL("quadwebgl");
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
