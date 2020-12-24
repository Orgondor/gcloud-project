import Locations from "./locations";

export default `#version 300 es
  precision mediump float;
  in vec3 color;

  in vec2 pass_textureCoords;
  in vec3 surfaceNormal;
  in vec3 lightVector;

  out vec4 outColor;

  uniform sampler2D ${Locations.DIFFUSE_TEXTURE};
  uniform int ${Locations.HAS_DIFFUSE_TEXTURE};

  uniform vec3 ${Locations.LIGHT_COLOR};
  uniform float ${Locations.LIGHT_AMBIENT};

  vec4 getDiffuseTexture() {
    if (${Locations.HAS_DIFFUSE_TEXTURE} == 1) {
      return texture(${Locations.DIFFUSE_TEXTURE}, pass_textureCoords);
    }
    return vec4(1.0, 1.0, 1.0, 1.0);
  }

  float nDot() {
    vec3 unitNormal = normalize(surfaceNormal);
    vec3 unitLightVector = normalize(lightVector);
    return dot(unitNormal, unitLightVector);
  }

  vec4 diffuseLighting() {
    float brightness = max(nDot(), ${Locations.LIGHT_AMBIENT});
    return vec4(brightness * ${Locations.LIGHT_COLOR}.rgb, 1.0);
  }

  void main() {
    outColor = vec4(color, 1.0) * diffuseLighting() * getDiffuseTexture();
  }
`;