import * as React from 'react';
import { useAppState } from '../../hooks/useAppState'
import WebGL from "./WebGL/WebGL"

const Home = () => {
  const appState = useAppState();
  React.useEffect(() => {
    WebGL("webgl");
  });
  return (
    <div style={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
      <canvas id="webgl" width="800" height="600" style={{border: "1px solid black"}}></canvas>
    </div>
  )
};

export default Home;