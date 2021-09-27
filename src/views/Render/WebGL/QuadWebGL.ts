import * as React from "react";
import GLM from "./GLManager/GLM";
import QuadRenderer from "./Renderer/QuadRenderer";
import ModelType from "./Models/ModelType";
import ModelInstance from "./Models/ModelInstance";
import quad from "./Models/quad";
import Camera from "./Camera/camera";
import MouseEvent from "./EventHandlers/mouse";
import KeyEvent from "./EventHandlers/keyboard";
import ModelInstace from "./Models/ModelInstance";
// import diffuse from "../../../images/sexkaitb_2K_Albedo.jpg";
// import normalMap from "../../../images/sexkaitb_2K_Normal.jpg";

export default (canvasId: string): void => {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error("Failed to find canvas component with id:", canvasId);
    return;
  }

  if (!(canvas instanceof HTMLCanvasElement)) {
    console.error("The component with given id:", canvasId, "is not a canvas");
    return;
  } else {
    const cs = getComputedStyle(canvas);
    canvas.width = parseInt(cs.getPropertyValue("width"), 10);
    canvas.height = parseInt(cs.getPropertyValue("height"), 10);
    canvas.style.outline = "none";
    canvas.tabIndex = -1;
  }

  const gl = canvas.getContext("webgl2");

  if (!gl) {
    console.error("Failed to get webgl context");
    return;
  }

  GLM.init(gl);
  // MouseEvent.init();
  // KeyEvent.init();

  const modelRenderer = new QuadRenderer();
  const modelType = new ModelType(
    quad.vertices,
    quad.indices,
    quad.normals,
    quad.textureCoords
  );
  modelRenderer.registerNewModel(modelType, "quad");

  const camera = new Camera(0, 0, 1.5);

  const startTime = Date.now() / 1000;
  let lastUpdate = startTime;

  const instance = new ModelInstance();
  instance.updateRotation(0, 0, 0);
  modelRenderer.addInstance(instance, "quad");

  const render = () => {
    const now = Date.now() / 1000;
    const deltaTime = now - lastUpdate;
    lastUpdate = now;
    GLM.clear(0, 0, 0, 1);
    //instance.updateRotation(0.1, 0, 0);
    camera.update(deltaTime);
    modelRenderer.render(camera, now - startTime, deltaTime);
    window.requestAnimationFrame(render);
  };

  window.requestAnimationFrame(render);
};
