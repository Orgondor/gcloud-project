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
  textureCoordsAttribute: number;
  diffuseTexture: WebGLUniformLocation;
  hasDiffuseTexture: WebGLUniformLocation;
  transformationMatrix: WebGLUniformLocation;
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
    this.textureCoordsAttribute = GLM.getAttributeLocation(program, Locations.TEXTURE_COORDS);
    this.diffuseTexture = GLM.getUniformLocation(program, Locations.DIFFUSE_TEXTURE);
    this.hasDiffuseTexture = GLM.getUniformLocation(program, Locations.HAS_DIFFUSE_TEXTURE);
    this.transformationMatrix = GLM.getUniformLocation(program, Locations.TRANSFORMATION_MATRIX);
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

  enableTextureCoords = () => {
    GLM.enableVertexAttributeArray(this.textureCoordsAttribute);
    GLM.pointToAttribute(this.textureCoordsAttribute, 2);
  }

  enableTransformationMatrix = (matrix: mat4) => {
    GLM.uploadMatrix4fv(this.transformationMatrix, matrix);
  }

  enableLight = (light: Light) => {
    GLM.uploadVec3f(this.lightPosition, light.getPosition());
    GLM.uploadVec3f(this.lightColor, light.getColor());
    GLM.uploadFloat(this.lightAmibient, light.getAmbient());
  }
}