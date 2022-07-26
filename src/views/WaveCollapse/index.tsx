import React, { useState } from "react";
import { WaveCollapse } from "./WaveCollapse";

const canvasId = "waveCollapseCanvas";

const WaveCollapseView: React.FC = () => {
  const [initialized, setInitialized] = useState(false);

  React.useEffect(() => {
    if (!initialized) {
      WaveCollapse(canvasId);
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
        id={canvasId}
        style={{
          border: "1px solid black",
          width: "min(70vh, 100vw)",
          height: "min(70vh, 100vw)",
        }}
        width={300}
        height={300}
      />
    </div>
  );
};

export default WaveCollapseView;
