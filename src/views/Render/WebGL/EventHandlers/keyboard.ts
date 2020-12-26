import GLM from "../GLManager/GLM";

interface KeyEventListener {
  onkeydown: (e: KeyboardEvent) => any;
  onkeyup: (e: KeyboardEvent) => any;
}

class KeyListener {
  onKeyListeners: KeyEventListener[];

  constructor() {
    this.onKeyListeners = [];
  }

  init = () => {
    GLM.gl.canvas.onkeydown = (e: KeyboardEvent) => {
      this.onKeyListeners.forEach((listener) => {
        listener.onkeydown(e);
      })
    }

    GLM.gl.canvas.onkeyup = (e: KeyboardEvent) => {
      this.onKeyListeners.forEach((listener) => {
        listener.onkeyup(e);
      })
    }
  }

  subscribeToKey = (listener: KeyEventListener) => {
    this.onKeyListeners.push(listener);
  }
}

const KeyEvent = new KeyListener();
export default KeyEvent;