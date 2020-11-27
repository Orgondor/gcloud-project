import * as React from 'react';
import GLM from "./GLManager/GLM";
import ModelRenderer from "./Renderer/ModelRenderer";
import ModelType from "./Models/ModelType";
import ModelInstance from "./Models/ModelInstance";
import cube from "./Models/cube"
import Light from "./LightSource/Light"

export default (canvasId: string) => {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error("Failed to find canvas component with id:", canvasId);
    return;
  }

  if (!(canvas instanceof HTMLCanvasElement)) {
    console.error("The component with given id:", canvasId, "is not a canvas");
    return;
  }

  const gl = canvas.getContext("webgl2");

  if (!gl) {
    console.error("Failed to get webgl context")
    return;
  }

  GLM.init(gl);

  const modelRenderer = new ModelRenderer();
  const light = new Light(100, 100, -100, 1.0, 1.0, 1.0, 0.3);
  modelRenderer.registerNewModel(new ModelType(cube.vertices, cube.indices, cube.normals), "triangle");
  const instance = new ModelInstance(0, 0, 0, 0, 0, 0, 0.5);
  modelRenderer.addInstance(instance, "triangle");

  const render = () => {
    GLM.clear(1, 1, 1, 1);
    instance.updateRotation(1.0, 1.0, 1.0);
    modelRenderer.render(light);
    window.requestAnimationFrame(render);
  }

  window.requestAnimationFrame(render);
}