import { mat4, vec3 } from 'gl-matrix';
import * as React from 'react';

class GLManager {
  gl: WebGL2RenderingContext;

  init = (gl : WebGL2RenderingContext) => {
    this.gl = gl;
  }

  clear = (r:number, g:number, b:number, a:number) => {
    this.gl.clearColor(r, g, b, a);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }

  viewport = () => this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
  depthTest = (use: boolean) => use ? this.gl.enable(this.gl.DEPTH_TEST) : this.gl.disable(this.gl.DEPTH_TEST);

  createBuffer = () => this.gl.createBuffer();

  // float buffers
  bindArrayBufer = (buffer: WebGLBuffer) => this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
  unbindArrayBufer = () => this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
  addArrayBufferData = (verticies: number[]) => this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(verticies), this.gl.STATIC_DRAW);
  
  // int buffers
  bindElementArrayBufer = (buffer: WebGLBuffer) => this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, buffer);
  unbindElementArrayBufer = () => this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
  addElementArrayBufferData = (indicies: number[]) => this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Int16Array(indicies), this.gl.STATIC_DRAW);

  // shader functions

  createVertexShader = () => this.gl.createShader(this.gl.VERTEX_SHADER);
  createFragmentShader = () => this.gl.createShader(this.gl.FRAGMENT_SHADER);

  addShaderSource = (shader: WebGLShader, source: string) => this.gl.shaderSource(shader, source);
  compileShader = (shader: WebGLShader) => this.gl.compileShader(shader);
  createShaderProgram = () => this.gl.createProgram();
  attachShaderProgram = (program: WebGLProgram, shader: WebGLShader) => this.gl.attachShader(program, shader);
  linkProgram = (program: WebGLProgram) => this.gl.linkProgram(program);
  useProgram = (program: WebGLProgram) => this.gl.useProgram(program);

  getAttributeLocation = (program: WebGLProgram, attribute: string) => this.gl.getAttribLocation(program, attribute);
  enableVertexAttributeArray = (attribute: number) => this.gl.enableVertexAttribArray(attribute);
  pointToAttribute = (data: number, dimentions: number) => this.gl.vertexAttribPointer(data, dimentions, this.gl.FLOAT, false, 0, 0);

  drawTriangles = (numberOfIndicies: number) => this.gl.drawElements(this.gl.TRIANGLES, numberOfIndicies, this.gl.UNSIGNED_SHORT, 0);

  uploadMatrix4fv = (location: WebGLUniformLocation, matrix: mat4) => this.gl.uniformMatrix4fv(location, false, matrix)
  getUniformLocation = (program: WebGLProgram, uniform: string) => this.gl.getUniformLocation(program, uniform);
  
  uploadVec3f = (location: WebGLUniformLocation, vec: vec3) => this.gl.uniform3fv(location, vec);
  
  uploadFloat = (location: WebGLUniformLocation, value: number) => this.gl.uniform1f(location, value)
}

const GLM = new GLManager();

export default GLM;