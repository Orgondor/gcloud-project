import Locations from "./locations";

export default `
  precision mediump float;
  attribute vec3 ${Locations.POSITION};
  attribute vec3 ${Locations.NORMAL};

  varying vec3 surfaceNormal;
  varying vec3 lightVector;
  varying vec3 pass_lightColor;
  varying float pass_lightAmbient;
  varying vec3 color;

  uniform mat4 ${Locations.TRANSFORMATION_MATRIX};
  uniform vec3 ${Locations.LIGHT_POSITION};
  uniform vec3 ${Locations.LIGHT_COLOR};
  uniform float ${Locations.LIGHT_AMBIENT};

  void main() {
    vec4 worldPos = ${Locations.TRANSFORMATION_MATRIX} * vec4(${Locations.POSITION}, 1.0);
    surfaceNormal = (${Locations.TRANSFORMATION_MATRIX} * vec4(${Locations.NORMAL}, 1.0)).xyz;
    lightVector = ${Locations.LIGHT_POSITION} - worldPos.xyz;
    color = ${Locations.POSITION};
    gl_Position = worldPos;
    
    pass_lightColor = ${Locations.LIGHT_COLOR};
    pass_lightAmbient = ${Locations.LIGHT_AMBIENT};
  }
`;