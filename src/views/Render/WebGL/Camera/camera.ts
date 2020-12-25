import { vec3, mat4 } from "gl-matrix";
import { toRadians } from "../Utils/math";
import GLM from "../GLManager/GLM";
import Shader from "../Shaders/ModelShader/shader";
import MouseEvent from "../EventHandlers/mouse";
import { MouseEvent } from "react";

const maxZoomInFOV = 10;
const maxZoomOutFOV = 80;

export default class Camera {
  x: number;
  y: number;
  z: number;
  pitch: number;
  yaw: number;
  roll: number;
  near: number;
  far: number;
  fov: number;
  viewMatrix: mat4;
  projectionMatrix: mat4;

  constructor(x: number = 5, y: number = -6.5, z: number = 15, pitch: number = -35, yaw: number = 0, roll: number = 0, near: number = 0.1, far: number = 1000, fov: number = 40) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.pitch = pitch;
    this.yaw = yaw;
    this.roll = roll;
    this.near = near;
    this.far = far;
    this.fov = fov;
    this.generateMatrices();
    MouseEvent.subscribeToDrag(this);
    MouseEvent.subscribeToWheel(this);
  }

  ondrag = (dx: number, dy: number) => {
    this.x += dx * 0.01;
    this.y -= dy * 0.01;
    this.generateMatrices();
  }

  onwheel = (e: WheelEvent) => {
    this.fov = Math.min(Math.max(this.fov + e.deltaY * 0.01, maxZoomInFOV), maxZoomOutFOV);
    this.generateMatrices();
  }

  enable = (shader: Shader) => {
    shader.enableViewProjectionMatrices(this.viewMatrix, this.projectionMatrix);
  }

  generateMatrices = () => {
    this.viewMatrix = this.createViewMatrix();
    this.projectionMatrix = this.createProjectionMatrix();
  }

  createViewMatrix = () => {
    const matrix = mat4.create(); // creates an identity matrix
    mat4.rotateX(matrix, matrix, toRadians(this.pitch));
    mat4.rotateY(matrix, matrix, toRadians(this.yaw));
    mat4.rotateZ(matrix, matrix, toRadians(this.roll));
    mat4.translate(matrix, matrix, vec3.fromValues(-this.x, -this.y, -this.z));
    return matrix;
  }

  createProjectionMatrix = () => {
    const aspectRatio = GLM.gl.canvas.width / GLM.gl.canvas.height;
    const matrix = mat4.create();
    mat4.perspective(matrix, toRadians(this.fov), aspectRatio, this.near, this.far);
    return matrix;
  }
}