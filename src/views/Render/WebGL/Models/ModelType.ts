import GLM from "../GLManager/GLM"
import Shader from "../Shaders/ModelShader/shader"
import Material from "../Materials/material"

export default class ModelType {
  verticies: number[];
  indicies: number[];
  normals: number[];
  textureCoords: number[];
  vertexBuffer: WebGLBuffer;
  indexBuffer: WebGLBuffer;
  normalBuffer: WebGLBuffer;
  textureCoordBuffer: WebGLBuffer;
  material: Material;

  constructor(verticies: number[], indicies: number[], normals: number[], textureCoords: number[]) {
    this.verticies = verticies;
    this.indicies = indicies;
    this.normals = normals;
    this.textureCoords = textureCoords;
    this._genVertexBuffer();
    this._genIndexBuffer();
    this._genNormalBuffer();
    this._genTextureCoordBuffer();
    this.material = new Material();
  }

  _genVertexBuffer = () => {
    this.vertexBuffer = GLM.createBuffer();
    GLM.bindArrayBufer(this.vertexBuffer);
    GLM.addArrayBufferData(this.verticies);
    GLM.unbindArrayBufer();
  }

  _genIndexBuffer = () => {
    this.indexBuffer = GLM.createBuffer();
    GLM.bindElementArrayBufer(this.indexBuffer);
    GLM.addElementArrayBufferData(this.indicies);
    GLM.unbindElementArrayBufer();
  }

  _genNormalBuffer = () => {
    this.normalBuffer = GLM.createBuffer();
    GLM.bindArrayBufer(this.normalBuffer);
    GLM.addArrayBufferData(this.normals);
    GLM.unbindArrayBufer();
  }

  _genTextureCoordBuffer = () => {
    this.textureCoordBuffer = GLM.createBuffer();
    GLM.bindArrayBufer(this.textureCoordBuffer);
    GLM.addArrayBufferData(this.textureCoords);
    GLM.unbindArrayBufer();
  }

  addMaterial = (material: Material) => {
    this.material = material;
  }

  use = (shader: Shader) => {
    GLM.bindArrayBufer(this.vertexBuffer);
    shader.enablePosition();
    GLM.bindArrayBufer(this.textureCoordBuffer);
    shader.enableTextureCoords();
    GLM.bindArrayBufer(this.normalBuffer);
    shader.enableNormals();
    GLM.bindElementArrayBufer(this.indexBuffer);
    this.material.enable(shader);
  }
}