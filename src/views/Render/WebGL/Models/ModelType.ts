import GLM from "../GLManager/GLM"
import Shader from "../Shaders/ModelShader/shader"

export default class ModelType {
  verticies: number[];
  indicies: number[];
  normals: number[];
  vertexBuffer: WebGLBuffer;
  indexBuffer: WebGLBuffer;
  normalBuffer: WebGLBuffer;

  constructor(verticies: number[], indicies: number[], normals: number[]) {
    this.verticies = verticies;
    this.indicies = indicies;
    this.normals = normals;
    this.genVertexBuffer();
    this.genIndexBuffer();
    this.genNormalBuffer();
  }

  genVertexBuffer = () => {
    this.vertexBuffer = GLM.createBuffer();
    GLM.bindArrayBufer(this.vertexBuffer);
    GLM.addArrayBufferData(this.verticies);
    GLM.unbindArrayBufer();
  }

  genIndexBuffer = () => {
    this.indexBuffer = GLM.createBuffer();
    GLM.bindElementArrayBufer(this.indexBuffer);
    GLM.addElementArrayBufferData(this.indicies);
    GLM.unbindElementArrayBufer();
  }

  genNormalBuffer = () => {
    this.normalBuffer = GLM.createBuffer();
    GLM.bindArrayBufer(this.normalBuffer);
    GLM.addArrayBufferData(this.normals);
    GLM.unbindArrayBufer();
  }

  use = (shader: Shader) => {
    GLM.bindArrayBufer(this.vertexBuffer);
    shader.enablePosition();
    GLM.bindArrayBufer(this.normalBuffer);
    shader.enableNormals();
    GLM.bindElementArrayBufer(this.indexBuffer);
  }
}