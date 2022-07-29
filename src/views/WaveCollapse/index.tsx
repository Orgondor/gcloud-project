import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import { WaveCollapse } from "./WaveCollapse";
import { cancelWaveCollapse, setSpeed, speed } from "./defines";
import { Stack } from "@mui/material";
import { Button } from "semantic-ui-react";
import { MapSettings, PathMap } from "./types";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const imagePaths: PathMap = require("../../images/waveCollapse/*.png");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mapSettings: MapSettings = require("../../images/waveCollapse/mapSettings.json");

const canvasId = "waveCollapseCanvas";

const WaveCollapseView: React.FC = () => {
  const [spriteMap, setSpriteMap] = useState("SimpleSprites");
  const [initialized, setInitialized] = useState(false);
  const [running, setRunning] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [redraw, setRedraw] = useState(false);
  const [value, setValue] = React.useState(speed);

  const collapse = () =>
    WaveCollapse(
      canvasId,
      imagePaths[spriteMap],
      mapSettings[spriteMap],
      (input) => setRunning(input),
      (input) => setCancel(input)
    );

  React.useEffect(() => {
    if (!initialized) {
      collapse();
      setInitialized(true);
    }
  });

  React.useEffect(() => {
    if (cancel) {
      cancelWaveCollapse();
    }

    if (!cancel && redraw) {
      collapse();
    }
  }, [cancel]);

  const redrawCanvas = () => {
    if (running) {
      setCancel(true);
      setRedraw(true);
      return;
    }

    collapse();
  };

  const handleChange = (_: Event, newValue: number | number[]) => {
    setValue(newValue as number);
    setSpeed(newValue as number);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          paddingTop: "16px",
          paddingBottom: "16px",
        }}
      >
        <Stack
          spacing={2}
          direction="row"
          sx={{ mb: 1 }}
          justifyContent="center"
          alignItems="center"
        >
          {Object.keys(mapSettings).map((filename, i) => (
            <img
              key={i}
              src={imagePaths[filename]}
              style={{
                width: "100px",
                imageRendering: "pixelated",
                borderStyle: "solid",
                borderWidth: "3px",
                borderColor: spriteMap === filename ? "red" : "black",
                cursor: "pointer",
              }}
              onClick={() => setSpriteMap(filename)}
            />
          ))}
        </Stack>
        <Stack
          spacing={2}
          direction="row"
          sx={{ mb: 1 }}
          justifyContent="center"
          alignItems="center"
        >
          <Button onClick={redrawCanvas}>Redraw</Button>
          <div>Speed</div>
          <Slider
            aria-label="Speed"
            sx={{ width: "min(500px, 50vw)" }}
            min={0}
            max={3}
            step={0.01}
            value={value}
            onChange={handleChange}
          />
        </Stack>
      </div>
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
