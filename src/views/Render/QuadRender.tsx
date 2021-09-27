import * as React from "react";
import { useAppState } from "../../hooks/useAppState";
import QuadWebGL from "./WebGL/QuadWebGL";

const Home = () => {
  const appState = useAppState();
  React.useEffect(() => {
    QuadWebGL("quadwebgl");
  });
  return (
    // <div style={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
    <div
      style={{
        position: "absolute",
        left: "0px",
        width: "100%",
        height: "90%",
      }}
    >
      <canvas
        id="quadwebgl"
        style={{ border: "1px solid black", width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default Home;
