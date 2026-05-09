import { Component, html } from "@rendly/bedrockjs";

class Cube3D extends Component {
  static tag = "cube-3d";

  private rotX = -20;
  private rotY = 30;
  private velX = 0;
  private velY = 0.3;
  private isDragging = false;
  private lastX = 0;
  private lastY = 0;
  private cubeEl: HTMLElement | null = null;
  private rafId = 0;
  private _ready = false;

  render() {
    if (!this._ready) {
      this._ready = true;
      requestAnimationFrame(() => this.init());
    }

    return html`
      <div class="cube-wrapper">
        <div class="cube-scene">
          <div class="cube">
            <div class="cube-face front">
              <span class="face-icon">{ B }</span>
              <span class="face-label">Bedrock</span>
            </div>
            <div class="cube-face back">
              <span class="face-icon">&lt;/&gt;</span>
              <span class="face-label">Components</span>
            </div>
            <div class="cube-face right">
              <span class="face-icon">=&gt;</span>
              <span class="face-label">Routes</span>
            </div>
            <div class="cube-face left">
              <span class="face-icon">$..</span>
              <span class="face-label">State</span>
            </div>
            <div class="cube-face top">
              <span class="face-icon">fn()</span>
              <span class="face-label">Reactive</span>
            </div>
            <div class="cube-face bottom">
              <span class="face-icon">~/~</span>
              <span class="face-label">Sync</span>
            </div>
          </div>
        </div>
        <p class="cube-hint">Drag to spin</p>
      </div>
    `;
  }

  private init() {
    this.cubeEl = this.querySelector(".cube") as HTMLElement;
    if (!this.cubeEl) return;

    this.addEventListener("mousedown", this.onMouseDown);
    this.addEventListener("touchstart", this.onTouchStart, { passive: false });
    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("touchmove", this.onTouchMove, { passive: false });
    window.addEventListener("mouseup", this.onPointerUp);
    window.addEventListener("touchend", this.onPointerUp);

    this.animate();
  }

  disconnectedCallback() {
    cancelAnimationFrame(this.rafId);
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("touchmove", this.onTouchMove);
    window.removeEventListener("mouseup", this.onPointerUp);
    window.removeEventListener("touchend", this.onPointerUp);
  }

  private animate = () => {
    if (!this.isDragging) {
      this.rotY += this.velY;
      this.rotX += this.velX;
      this.velX *= 0.97;
      if (Math.abs(this.velY) > 0.15) {
        this.velY *= 0.995;
      } else {
        this.velY += (0.15 - this.velY) * 0.01;
      }
    }

    if (this.cubeEl) {
      this.cubeEl.style.transform = `rotateX(${this.rotX}deg) rotateY(${this.rotY}deg)`;
    }

    this.rafId = requestAnimationFrame(this.animate);
  };

  private onMouseDown = (e: MouseEvent) => {
    this.isDragging = true;
    this.lastX = e.clientX;
    this.lastY = e.clientY;
  };

  private onTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    this.isDragging = true;
    this.lastX = e.touches[0].clientX;
    this.lastY = e.touches[0].clientY;
  };

  private onMouseMove = (e: MouseEvent) => {
    if (!this.isDragging) return;
    const dx = e.clientX - this.lastX;
    const dy = e.clientY - this.lastY;
    this.rotY += dx * 0.4;
    this.rotX -= dy * 0.4;
    this.velY = dx * 0.08;
    this.velX = -dy * 0.08;
    this.lastX = e.clientX;
    this.lastY = e.clientY;
  };

  private onTouchMove = (e: TouchEvent) => {
    if (!this.isDragging) return;
    e.preventDefault();
    const dx = e.touches[0].clientX - this.lastX;
    const dy = e.touches[0].clientY - this.lastY;
    this.rotY += dx * 0.4;
    this.rotX -= dy * 0.4;
    this.velY = dx * 0.08;
    this.velX = -dy * 0.08;
    this.lastX = e.touches[0].clientX;
    this.lastY = e.touches[0].clientY;
  };

  private onPointerUp = () => {
    this.isDragging = false;
  };
}

Cube3D.register();
