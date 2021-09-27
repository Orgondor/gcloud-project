import Texture from "./texture";
import GLM from "../GLManager/GLM";

interface MaterialShader {
  diffuseTexture?: WebGLUniformLocation;
  normalMapTexture?: WebGLUniformLocation;
}

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
  };

  addNormalMap = (url: string) => {
    this.normalMap.loadTexture(url);
    return this;
  };

  _enableDiffuse = (shader: MaterialShader) => {
    if (shader.diffuseTexture) {
      GLM.activeTexture(0);
      this.diffuse.enable();
      GLM.uploadInt(shader.diffuseTexture, 0);
    }
  };

  _enableNormalMap = (shader: MaterialShader) => {
    if (shader.normalMapTexture) {
      GLM.activeTexture(1);
      this.normalMap.enable();
      GLM.uploadInt(shader.normalMapTexture, 1);
    }
  };

  enable = (shader: MaterialShader) => {
    this._enableDiffuse(shader);
    this._enableNormalMap(shader);
  };
}
