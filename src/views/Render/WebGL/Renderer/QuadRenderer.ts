import GLM from "../GLManager/GLM";
import Shader, { QuadShader } from "../Shaders/QuadShader/shader";
import ModelType from "../Models/ModelType";
import ModelInstance from "../Models/ModelInstance";
import Camera from "../Camera/camera";

type Model = {
  type: ModelType;
  instances: ModelInstance[];
};

export default class ModelRenderer {
  shader: Record<QuadShader, Shader>;
  models: Record<QuadShader, Record<string, Model>>;

  constructor() {
    this.shader = {
      [QuadShader.Mandelbrot]: new Shader(QuadShader.Mandelbrot),
      [QuadShader.RayMarch]: new Shader(QuadShader.RayMarch),
    };
    this.models = {
      [QuadShader.Mandelbrot]: {},
      [QuadShader.RayMarch]: {},
    };
  }

  registerNewModel = (model: ModelType, shader: QuadShader, id: string) => {
    if (!this.models[shader][id]) {
      this.models[shader][id] = {
        type: model,
        instances: [],
      };
    }
  };

  addInstance = (instance: ModelInstance, shader: QuadShader, id: string) => {
    this.models[shader][id].instances.push(instance);
  };

  preRender = () => {
    GLM.viewport();
    GLM.depthTest(true);
  };

  render = (camera: Camera, uptime: number, deltaTime: number) => {
    this.preRender();
    Object.values(QuadShader).forEach((shaderId: QuadShader) => {
      this.shader[shaderId].use();
      camera.enable(this.shader[shaderId]);
      this.shader[shaderId].enableTime(uptime, deltaTime);
      Object.keys(this.models[shaderId]).forEach((id) => {
        this.models[shaderId][id].type.use(this.shader[shaderId]);
        this.models[shaderId][id].instances.forEach((instance) => {
          this.shader[shaderId].enableTransformationMatrix(
            instance.getTransformationMatrix()
          );
          GLM.drawTriangles(this.models[shaderId][id].type.indicies.length);
        });
      });
    });
  };
}
