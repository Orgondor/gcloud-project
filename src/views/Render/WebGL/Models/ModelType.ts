import GLM from "../GLManager/GLM";
import Shader from "../Shaders/ModelShader/shader";
import Material from "../Materials/material";

export default class ModelType {
  verticies: number[];
  indicies: number[];
  normals: number[];
  tangents: number[];
  textureCoords: number[];
  colors: number[];
  vertexBuffer: WebGLBuffer;
  indexBuffer: WebGLBuffer;
  normalBuffer: WebGLBuffer;
  tangentBuffer: WebGLBuffer;
  textureCoordBuffer: WebGLBuffer;
  colorBuffer: WebGLBuffer;
  material: Material;

  constructor(
    verticies: number[],
    indicies: number[],
    normals: number[],
    tangents: number[],
    textureCoords: number[],
    colors: number[]
  ) {
    this.verticies = verticies;
    this.indicies = indicies;
    this.normals = normals;
    this.tangents = tangents;
    this.textureCoords = textureCoords;
    this.colors = colors;
    this._genVertexBuffer();
    this._genIndexBuffer();
    this._genNormalBuffer();
    this._genTangentBuffer();
    this._genTextureCoordBuffer();
    this._genColorBuffer();
    this.material = new Material();
  }

  _genVertexBuffer = () => {
    this.vertexBuffer = GLM.createBuffer();
    GLM.bindArrayBufer(this.vertexBuffer);
    GLM.addArrayBufferData(this.verticies);
    GLM.unbindArrayBufer();
  };

  _genIndexBuffer = () => {
    this.indexBuffer = GLM.createBuffer();
    GLM.bindElementArrayBufer(this.indexBuffer);
    GLM.addElementArrayBufferData(this.indicies);
    GLM.unbindElementArrayBufer();
  };

  _genNormalBuffer = () => {
    this.normalBuffer = GLM.createBuffer();
    GLM.bindArrayBufer(this.normalBuffer);
    GLM.addArrayBufferData(this.normals);
    GLM.unbindArrayBufer();
  };

  _genTangentBuffer = () => {
    this.tangentBuffer = GLM.createBuffer();
    GLM.bindArrayBufer(this.tangentBuffer);
    GLM.addArrayBufferData(this.tangents);
    GLM.unbindArrayBufer();
  };

  _genTextureCoordBuffer = () => {
    this.textureCoordBuffer = GLM.createBuffer();
    GLM.bindArrayBufer(this.textureCoordBuffer);
    GLM.addArrayBufferData(this.textureCoords);
    GLM.unbindArrayBufer();
  };

  _genColorBuffer = () => {
    this.colorBuffer = GLM.createBuffer();
    GLM.bindArrayBufer(this.colorBuffer);
    GLM.addArrayBufferData(this.colors);
    GLM.unbindArrayBufer();
  };

  addMaterial = (material: Material) => {
    this.material = material;
  };

  use = (shader: Shader) => {
    GLM.bindArrayBufer(this.vertexBuffer);
    shader.enablePosition();
    GLM.bindArrayBufer(this.textureCoordBuffer);
    shader.enableTextureCoords();
    GLM.bindArrayBufer(this.normalBuffer);
    shader.enableNormals();
    GLM.bindArrayBufer(this.tangentBuffer);
    shader.enableTangents();
    GLM.bindElementArrayBufer(this.indexBuffer);
    this.material.enable(shader);
    GLM.bindArrayBufer(this.colorBuffer);
    shader.enableColors();
  };
}
