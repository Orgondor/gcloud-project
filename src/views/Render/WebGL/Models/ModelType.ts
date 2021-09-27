import GLM from "../GLManager/GLM";
import Material from "../Materials/material";

interface ModelShader {
  enablePosition: () => void;
  enableTextureCoords: () => void;
  enableNormals: () => void;
  enableTangents: () => void;
  enableColors: () => void;
  diffuseTexture?: WebGLUniformLocation;
  normalMapTexture?: WebGLUniformLocation;
}

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
  textureCoordBuffer: WebGLBuffer;
  tangentBuffer: WebGLBuffer | undefined;
  colorBuffer: WebGLBuffer | undefined;
  material: Material | undefined;

  constructor(
    verticies: number[],
    indicies: number[],
    normals: number[],
    textureCoords: number[],
    tangents?: number[],
    colors?: number[]
  ) {
    this.verticies = verticies;
    this.indicies = indicies;
    this.normals = normals;
    this.textureCoords = textureCoords;
    this.tangents = tangents;
    this.colors = colors;
    this._genVertexBuffer();
    this._genIndexBuffer();
    this._genNormalBuffer();
    this._genTextureCoordBuffer();
    this._genTangentBuffer();
    this._genColorBuffer();
    this.material = new Material();
  }

  _genVertexBuffer = (): void => {
    this.vertexBuffer = GLM.createBuffer();
    GLM.bindArrayBufer(this.vertexBuffer);
    GLM.addArrayBufferData(this.verticies);
    GLM.unbindArrayBufer();
  };

  _genIndexBuffer = (): void => {
    this.indexBuffer = GLM.createBuffer();
    GLM.bindElementArrayBufer(this.indexBuffer);
    GLM.addElementArrayBufferData(this.indicies);
    GLM.unbindElementArrayBufer();
  };

  _genNormalBuffer = (): void => {
    this.normalBuffer = GLM.createBuffer();
    GLM.bindArrayBufer(this.normalBuffer);
    GLM.addArrayBufferData(this.normals);
    GLM.unbindArrayBufer();
  };

  _genTextureCoordBuffer = (): void => {
    this.textureCoordBuffer = GLM.createBuffer();
    GLM.bindArrayBufer(this.textureCoordBuffer);
    GLM.addArrayBufferData(this.textureCoords);
    GLM.unbindArrayBufer();
  };

  _genTangentBuffer = (): void => {
    if (this.tangents) {
      this.tangentBuffer = GLM.createBuffer();
      GLM.bindArrayBufer(this.tangentBuffer);
      GLM.addArrayBufferData(this.tangents);
      GLM.unbindArrayBufer();
    }
  };

  _genColorBuffer = (): void => {
    if (this.colors) {
      this.colorBuffer = GLM.createBuffer();
      GLM.bindArrayBufer(this.colorBuffer);
      GLM.addArrayBufferData(this.colors);
      GLM.unbindArrayBufer();
    }
  };

  addMaterial = (material: Material): void => {
    this.material = material;
  };

  use = (shader: ModelShader): void => {
    GLM.bindArrayBufer(this.vertexBuffer);
    shader.enablePosition();
    GLM.bindArrayBufer(this.textureCoordBuffer);
    shader.enableTextureCoords();
    GLM.bindArrayBufer(this.normalBuffer);
    shader.enableNormals();
    GLM.bindElementArrayBufer(this.indexBuffer);
    if (this.material) {
      this.material.enable(shader);
    }
    if (this.tangentBuffer) {
      GLM.bindArrayBufer(this.tangentBuffer);
      shader.enableTangents();
    }
    if (this.colorBuffer) {
      GLM.bindArrayBufer(this.colorBuffer);
      shader.enableColors();
    }
  };
}
