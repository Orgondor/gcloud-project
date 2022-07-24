import GLM from "../GLManager/GLM";

interface DragEventListener {
  ondrag: (dx: number, dy: number) => any;
}

interface WheelEventListener {
  onwheel: (e: WheelEvent) => any;
}

class MouseListener {
  onWheelListeners: WheelEventListener[];
  onDragListeners: DragEventListener[];

  constructor() {
    this.onWheelListeners = [];
    this.onDragListeners = [];
  }

  init = () => {
    let x = 0;
    let y = 0;
    let dragging = false;

    GLM.gl.canvas.onwheel = (e: WheelEvent) => {
      this.onWheelListeners.forEach((listener) => {
        listener.onwheel(e);
      });
    };

    GLM.gl.canvas.onmousedown = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      dragging = true;
    };

    GLM.gl.canvas.onmouseup = (e: MouseEvent) => {
      dragging = false;
    };

    GLM.gl.canvas.onmousemove = (e: MouseEvent) => {
      if (dragging) {
        const dx = x - e.clientX;
        const dy = y - e.clientY;
        x = e.clientX;
        y = e.clientY;
        this.onDragListeners.forEach((listener) => {
          listener.ondrag(dx, dy);
        });
      }
    };

    GLM.gl.canvas.ontouchstart = (e: TouchEvent) => {
      e.preventDefault();
      if (e.changedTouches) {
        x = e.changedTouches[0].clientX;
        y = e.changedTouches[0].clientY;
        dragging = true;
      }
    };

    GLM.gl.canvas.ontouchmove = (e: TouchEvent) => {
      e.preventDefault();
      if (e.changedTouches) {
        const dx = x - e.changedTouches[0].clientX;
        const dy = y - e.changedTouches[0].clientY;
        x = e.changedTouches[0].clientX;
        y = e.changedTouches[0].clientY;
        this.onDragListeners.forEach((listener) => {
          listener.ondrag(dx, dy);
        });
        dragging = true;
      }
    };

    GLM.gl.canvas.ontouchend = (e: TouchEvent) => {
      e.preventDefault();
      dragging = false;
    };
  };

  subscribeToDrag = (listener: DragEventListener) => {
    this.onDragListeners.push(listener);
  };

  subscribeToWheel = (listener: WheelEventListener) => {
    this.onWheelListeners.push(listener);
  };
}

const MouseEvent = new MouseListener();
export default MouseEvent;
