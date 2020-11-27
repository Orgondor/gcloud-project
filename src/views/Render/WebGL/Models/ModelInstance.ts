import { mat4 } from "gl-matrix";
import { createTransformationMatrix } from "../Utils/math";

export default class ModelInstace {
  x: number;
  y: number;
  z: number;
  pitch: number;
  yaw: number;
  roll: number;
  scale: number;
  transformationMatrix: mat4;

  constructor(x: number = 0, y: number = 0, z: number = 0, pitch: number = 0, yaw: number = 0, roll: number = 0, scale: number = 1) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.pitch = pitch;
    this.yaw = yaw;
    this.roll = roll;
    this.scale = scale;
  }

  updatePosition = (x: number, y: number, z: number) => {
    this.x += x;
    this.y += y;
    this.z += z;
    this.updateTransformationMatrix();
  }

  updateRotation = (pitch: number, yaw: number, roll: number) => {
    this.pitch += pitch;
    this.yaw += yaw;
    this.roll += roll;
    this.updateTransformationMatrix();
  }
  
  updateScale = (scale: number) => {
    this.scale += scale;
    this.updateTransformationMatrix();
  }

  updateTransformationMatrix = () => {
    this.transformationMatrix = createTransformationMatrix(
      this.x,
      this.y,
      this.z,
      this.pitch,
      this.yaw,
      this.roll,
      this.scale
    )
  }

  getTransformationMatrix = () => this.transformationMatrix;
}