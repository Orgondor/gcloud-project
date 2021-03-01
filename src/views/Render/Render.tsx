import * as React from "react";
import { useAppState } from "../../hooks/useAppState";
import WebGL from "./WebGL/WebGL";

const Home = () => {
  const appState = useAppState();
  React.useEffect(() => {
    WebGL("webgl");
  });
  return (
    // <div style={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
    <div
      style={{
        position: "absolute",
        left: "0px",
        width: "100%",
        height: "100%",
      }}
    >
      <canvas
        id="webgl"
        style={{ border: "1px solid black", width: "100%", height: "100%" }}
      ></canvas>
    </div>
  );
};

export default Home;
