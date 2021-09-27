import GLM from "../../GLManager/GLM";
import VertexSource from "./vertex";
import FragmentSource from "./fragment";
import Locations from "./locations";
import { mat4 } from "gl-matrix";

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

  constructor() {
    const vertexShader = GLM.createVertexShader();
    GLM.addShaderSource(vertexShader, VertexSource);
    GLM.compileShader(vertexShader);
    this.compileStatus(vertexShader);

    const fragmentShader = GLM.createFragmentShader();
    GLM.addShaderSource(fragmentShader, FragmentSource);
    GLM.compileShader(fragmentShader);
    this.compileStatus(fragmentShader);

    const program = GLM.createShaderProgram();
    GLM.attachShaderProgram(program, vertexShader);
    GLM.attachShaderProgram(program, fragmentShader);
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
