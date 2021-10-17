import GLM from "../../GLManager/GLM";
import VertexSource from "./vertex";
import MandelbrotSource from "./mandelbrot_frag";
import RayMarchSource from "./rayMarch_frag";
import Locations from "./locations";
import { mat4 } from "gl-matrix";

export enum QuadShader {
  Mandelbrot = "mandelbrot",
  RayMarch = "raymarch",
}
const shaderMap: Record<QuadShader, string> = {
  [QuadShader.Mandelbrot]: MandelbrotSource,
  [QuadShader.RayMarch]: RayMarchSource,
};

export default class ModelShader {
  program: WebGLProgram;
  positionAttribute: number;
  normalAttribute: number;
  textureCoordsAttribute: number;
  transformationMatrix: WebGLUniformLocation;
  viewMatrix: WebGLUniformLocation;
  projectionMatrix: WebGLUniformLocation;
  uptime: WebGLUniformLocation;
  deltaTime: WebGLUniformLocation;

  constructor(shader: QuadShader) {
    const vertexShader = GLM.createVertexShader();
    GLM.addShaderSource(vertexShader, VertexSource);
    GLM.compileShader(vertexShader);
    this.compileStatus(vertexShader);

    const fragShader = GLM.createFragmentShader();
    GLM.addShaderSource(fragShader, shaderMap[shader]);
    GLM.compileShader(fragShader);
    this.compileStatus(fragShader);

    const rayMarchShader = GLM.createFragmentShader();
    GLM.addShaderSource(rayMarchShader, RayMarchSource);
    GLM.compileShader(rayMarchShader);
    this.compileStatus(rayMarchShader);

    const program = GLM.createShaderProgram();
    GLM.attachShaderProgram(program, vertexShader);
    GLM.attachShaderProgram(program, fragShader);
    GLM.linkProgram(program);

    this.positionAttribute = GLM.getAttributeLocation(
      program,
      Locations.POSITION
    );
    this.normalAttribute = GLM.getAttributeLocation(program, Locations.NORMAL);
    this.textureCoordsAttribute = GLM.getAttributeLocation(
      program,
      Locations.TEXTURE_COORDS
    );
    this.transformationMatrix = GLM.getUniformLocation(
      program,
      Locations.TRANSFORMATION_MATRIX
    );
    this.viewMatrix = GLM.getUniformLocation(program, Locations.VIEW_MATRIX);
    this.projectionMatrix = GLM.getUniformLocation(
      program,
      Locations.PROJECTION_MATRIX
    );
    this.uptime = GLM.getUniformLocation(program, Locations.UPTIME);
    this.deltaTime = GLM.getUniformLocation(program, Locations.DELTA_TIME);
    this.program = program;
  }

  compileStatus = (shader: WebGLShader) => {
    if (!GLM.gl.getShaderParameter(shader, GLM.gl.COMPILE_STATUS)) {
      console.error(GLM.gl.getShaderInfoLog(shader));
    }
  };

  use = () => {
    GLM.useProgram(this.program);
  };

  enablePosition = () => {
    GLM.enableVertexAttributeArray(this.positionAttribute);
    GLM.pointToAttribute(this.positionAttribute, 3);
  };

  enableNormals = () => {
    GLM.enableVertexAttributeArray(this.normalAttribute);
    GLM.pointToAttribute(this.normalAttribute, 3);
  };

  enableTextureCoords = () => {
    GLM.enableVertexAttributeArray(this.textureCoordsAttribute);
    GLM.pointToAttribute(this.textureCoordsAttribute, 2);
  };

  enableTransformationMatrix = (matrix: mat4) => {
    GLM.uploadMatrix4fv(this.transformationMatrix, matrix);
  };

  enableViewProjectionMatrices = (viewMatrix: mat4, projectionMatrix: mat4) => {
    GLM.uploadMatrix4fv(this.viewMatrix, viewMatrix);
    GLM.uploadMatrix4fv(this.projectionMatrix, projectionMatrix);
  };

  enableTime = (uptime: number, deltaTime: number) => {
    GLM.uploadFloat(this.uptime, uptime);
    GLM.uploadFloat(this.deltaTime, deltaTime);
  };

  enableTangents = () => {
    return;
  };
  enableColors = () => {
    return;
  };
}
