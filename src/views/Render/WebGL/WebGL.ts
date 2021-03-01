import * as React from "react";
import GLM from "./GLManager/GLM";
import ModelRenderer from "./Renderer/ModelRenderer";
import ModelType from "./Models/ModelType";
import ModelInstance from "./Models/ModelInstance";
import cube from "./Models/cube";
import Light from "./LightSource/Light";
import Material from "./Materials/material";
import Camera from "./Camera/camera";
import MouseEvent from "./EventHandlers/mouse";
import KeyEvent from "./EventHandlers/keyboard";
import ModelInstace from "./Models/ModelInstance";
// import diffuse from "../../../images/sexkaitb_2K_Albedo.jpg";
// import normalMap from "../../../images/sexkaitb_2K_Normal.jpg";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const diffuse = require("../../../images/sexkaitb_2K_Albedo.jpg") as string;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const normalMap = require("../../../images/sexkaitb_2K_Normal.jpg") as string;

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
  MouseEvent.init();
  KeyEvent.init();

  const modelRenderer = new ModelRenderer();
  const light = new Light(100, -100, 100, 1.0, 1.0, 1.0, 0.3);
  const material = new Material();
  material.addDiffuse(diffuse);
  material.addNormalMap(normalMap);
  const modelType = new ModelType(
    cube.vertices,
    cube.indices,
    cube.normals,
    cube.tangents,
    cube.textureCoords,
    cube.colors
  );
  modelType.addMaterial(material);
  modelRenderer.registerNewModel(modelType, "cube");

  const camera = new Camera(3, -2, 5, -35);

  const instances: ModelInstace[] = [];

  let lastUpdate = Date.now();

  // for (let i = 0; i < 9; i++) {
  //   instances.push(new ModelInstance());
  //   modelRenderer.addInstance(instances[i], "cube");
  // }

  for (let i = 0; i < 9; i++) {
    instances.push(new ModelInstance((i % 3) * 3, Math.floor(i / 3) * 3));
    modelRenderer.addInstance(instances[i], "cube");
  }

  const render = () => {
    const now = Date.now();
    const deltaTime = (now - lastUpdate) / 1000;
    lastUpdate = now;
    GLM.clear(0, 0, 0, 1);
    instances.forEach((instance, i) => {
      instance.updateRotation(0.1 * i, 0.1 * i, 0.1 * i);
    });
    camera.update(deltaTime);
    modelRenderer.render(light, camera);
    window.requestAnimationFrame(render);
  };

  window.requestAnimationFrame(render);
};
