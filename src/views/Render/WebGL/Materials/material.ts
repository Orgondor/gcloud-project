import Texture from "./texture"
import GLM from "../GLManager/GLM"
import Shader from "../Shaders/ModelShader/shader"

export default class Material {
  diffuse: Texture;

  constructor() {
    this.diffuse = new Texture();
  }

  addDiffuse = (url: string) => {
    this.diffuse.loadTexture(url);
    return this;
  }

  _enableDiffuse = (shader: Shader) => {
    GLM.activeTexture(0);
    this.diffuse.enable();
    GLM.uploadInt(shader.diffuseTexture, 0);
    GLM.uploadBool(shader.hasDiffuseTexture, this.diffuse.hasTexture());
  }

  enable = (shader: Shader) => {
    this._enableDiffuse(shader);
  }
}