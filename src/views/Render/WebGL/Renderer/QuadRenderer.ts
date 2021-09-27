import GLM from "../GLManager/GLM";
import Shader from "../Shaders/QuadShader/shader";
import ModelType from "../Models/ModelType";
import ModelInstance from "../Models/ModelInstance";
import Camera from "../Camera/camera";

type Model = {
  type: ModelType;
  instances: ModelInstance[];
};

export default class ModelRenderer {
  shader: Shader;
  models: { [index: string]: Model };

  constructor() {
    this.shader = new Shader();
    this.models = {};
  }

  registerNewModel = (model: ModelType, id: string) => {
    if (!this.models[id]) {
      this.models[id] = {
        type: model,
        instances: [],
      };
    }
  };

  addInstance = (instance: ModelInstance, id: string) => {
    this.models[id].instances.push(instance);
  };

  preRender = () => {
    GLM.viewport();
    GLM.depthTest(true);
  };

  render = (camera: Camera, uptime: number, deltaTime: number) => {
    this.preRender();
    this.shader.use();
    camera.enable(this.shader);
    this.shader.enableTime(uptime, deltaTime);
    Object.keys(this.models).forEach((model) => {
      this.models[model].type.use(this.shader);
      this.models[model].instances.forEach((instance) => {
        this.shader.enableTransformationMatrix(
          instance.getTransformationMatrix()
        );
        GLM.drawTriangles(this.models[model].type.indicies.length);
      });
    });
  };
}
