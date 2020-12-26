import GLM from "../../GLManager/GLM";
import VertexSource from "./vertex";
import FragmentSource from "./fragment";
import Locations from "./locations";
import { mat4 } from "gl-matrix";
import Light from "../../LightSource/Light"

export default class ModelShader {
  program: WebGLProgram;
  positionAttribute: number;
  normalAttribute: number;
  tangentAttribute: number;
  textureCoordsAttribute: number;
  colorAttribute: number;
  diffuseTexture: WebGLUniformLocation;
  normalMapTexture: WebGLUniformLocation;
  transformationMatrix: WebGLUniformLocation;
  viewMatrix: WebGLUniformLocation;
  projectionMatrix: WebGLUniformLocation;
  lightPosition: WebGLUniformLocation;
  lightColor: WebGLUniformLocation;
  lightAmibient: WebGLUniformLocation;

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

    this.positionAttribute = GLM.getAttributeLocation(program, Locations.POSITION);
    this.normalAttribute = GLM.getAttributeLocation(program, Locations.NORMAL);
    this.tangentAttribute = GLM.getAttributeLocation(program, Locations.TANGENT);
    this.textureCoordsAttribute = GLM.getAttributeLocation(program, Locations.TEXTURE_COORDS);
    this.colorAttribute = GLM.getAttributeLocation(program, Locations.VERTEX_COLOR);
    this.diffuseTexture = GLM.getUniformLocation(program, Locations.DIFFUSE_TEXTURE);
    this.normalMapTexture = GLM.getUniformLocation(program, Locations.NORMAL_MAP_TEXTURE);
    this.transformationMatrix = GLM.getUniformLocation(program, Locations.TRANSFORMATION_MATRIX);
    this.viewMatrix = GLM.getUniformLocation(program, Locations.VIEW_MATRIX);
    this.projectionMatrix = GLM.getUniformLocation(program, Locations.PROJECTION_MATRIX);
    this.lightPosition = GLM.getUniformLocation(program, Locations.LIGHT_POSITION);
    this.lightColor = GLM.getUniformLocation(program, Locations.LIGHT_COLOR);
    this.lightAmibient = GLM.getUniformLocation(program, Locations.LIGHT_AMBIENT);
    this.program = program;
  }

  compileStatus = (shader: WebGLShader) => {
    if(!GLM.gl.getShaderParameter(shader, GLM.gl.COMPILE_STATUS)) {
      console.error(GLM.gl.getShaderInfoLog(shader));
    }
  }

  use = () => {
    GLM.useProgram(this.program);
  }

  enablePosition = () => {
    GLM.enableVertexAttributeArray(this.positionAttribute);
    GLM.pointToAttribute(this.positionAttribute, 3);
  }

  enableNormals = () => {
    GLM.enableVertexAttributeArray(this.normalAttribute);
    GLM.pointToAttribute(this.normalAttribute, 3);
  }

  enableTangents = () => {
    GLM.enableVertexAttributeArray(this.tangentAttribute);
    GLM.pointToAttribute(this.tangentAttribute, 3);
  }

  enableTextureCoords = () => {
    GLM.enableVertexAttributeArray(this.textureCoordsAttribute);
    GLM.pointToAttribute(this.textureCoordsAttribute, 2);
  }

  enableColors = () => {
    GLM.enableVertexAttributeArray(this.colorAttribute);
    GLM.pointToAttribute(this.colorAttribute, 3);
  }

  enableTransformationMatrix = (matrix: mat4) => {
    GLM.uploadMatrix4fv(this.transformationMatrix, matrix);
  }

  enableViewProjectionMatrices = (viewMatrix: mat4, projectionMatrix: mat4) => {
    GLM.uploadMatrix4fv(this.viewMatrix, viewMatrix);
    GLM.uploadMatrix4fv(this.projectionMatrix, projectionMatrix);
  }

  enableLight = (light: Light) => {
    GLM.uploadVec3f(this.lightPosition, light.getPosition());
    GLM.uploadVec3f(this.lightColor, light.getColor());
    GLM.uploadFloat(this.lightAmibient, light.getAmbient());
  }
}