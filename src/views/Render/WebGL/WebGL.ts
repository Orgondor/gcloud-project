import * as React from 'react';
import GLM from "./GLManager/GLM";
import ModelRenderer from "./Renderer/ModelRenderer";
import ModelType from "./Models/ModelType";
import ModelInstance from "./Models/ModelInstance";
import cube from "./Models/cube"
import Light from "./LightSource/Light"
import Material from "./Materials/material"
import diffuse from "../../../images/sexkaitb_2K_Albedo.jpg"

export default (canvasId: string) => {
  console.log("DIFFUSE:", diffuse);

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
  }

  const gl = canvas.getContext("webgl2");

  if (!gl) {
    console.error("Failed to get webgl context")
    return;
  }

  GLM.init(gl);

  const modelRenderer = new ModelRenderer();
  const light = new Light(100, 100, -100, 1.0, 1.0, 1.0, 0.3);
  const material = new Material();
  material.addDiffuse(diffuse);
  const modelType = new ModelType(cube.vertices, cube.indices, cube.normals, cube.textureCoords);
  modelType.addMaterial(material);
  modelRenderer.registerNewModel(modelType, "cube");
  const instance = new ModelInstance(0, 0, 0, 0, 0, 0, 0.5);
  modelRenderer.addInstance(instance, "cube");

  const render = () => {
    GLM.clear(0, 0, 0, 1);
    instance.updateRotation(0.2, 0.2, 0.2);
    modelRenderer.render(light);
    window.requestAnimationFrame(render);
  }

  window.requestAnimationFrame(render);
}