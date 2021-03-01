import GLM from "../GLManager/GLM";

export default class Texture {
  texture: WebGLTexture;
  done: boolean;

  constructor(isNormalMap = false) {
    this.done = false;
    this.texture = GLM.createTexture();
    GLM.bindTexture(this.texture);
    if (isNormalMap) {
      GLM.defineDummyNormalTexture();
    } else {
      GLM.defineDummyTexture();
    }
  }

  loadTexture = (url: string) => {
    const img = new Image();
    img.setAttribute("crossOrigin", "");
    img.onload = () => this.onLoad(img);
    img.src = url;
  };

  onLoad = (img: TexImageSource) => {
    GLM.bindTexture(this.texture);
    GLM.defineTexture(img);
    if (this.isPowerOfTwo(img.width) && this.isPowerOfTwo(img.height)) {
      GLM.texturePowerOfTwo();
    } else {
      GLM.textureNoPowerOfTwo();
    }
    this.done = true;
  };

  isPowerOfTwo = (side: number) => (side & (side - 1)) === 0;
  enable = () => GLM.bindTexture(this.texture);
  hasTexture = () => this.done;
}
