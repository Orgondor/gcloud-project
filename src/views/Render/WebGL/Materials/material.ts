import Texture from "./texture"
import GLM from "../GLManager/GLM"
import Shader from "../Shaders/ModelShader/shader"

export default class Material {
  diffuse: Texture;
  normalMap: Texture;

  constructor() {
    this.diffuse = new Texture();
    this.normalMap = new Texture(true);
  }

  addDiffuse = (url: string) => {
    this.diffuse.loadTexture(url);
    return this;
  }

  addNormalMap = (url: string) => {
    this.normalMap.loadTexture(url);
    return this;
  }

  _enableDiffuse = (shader: Shader) => {
    GLM.activeTexture(0);
    this.diffuse.enable();
    GLM.uploadInt(shader.diffuseTexture, 0);
  }

  _enableNormalMap = (shader: Shader) => {
    GLM.activeTexture(1);
    this.normalMap.enable();
    GLM.uploadInt(shader.normalMapTexture, 1);
  }

  enable = (shader: Shader) => {
    this._enableDiffuse(shader);
    this._enableNormalMap(shader);
  }
}