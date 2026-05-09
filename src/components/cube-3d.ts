import { Component, html } from "@rendly/bedrockjs";

const GRID = 3; // 3x3x3 = 27 sub-cubes
const SUB_SIZE = 60;
const GAP = 4;
const SPACING = SUB_SIZE + GAP;

type Pos = readonly [number, number, number];

const POSITIONS: Pos[] = (() => {
  const out: Pos[] = [];
  const offset = (GRID - 1) / 2;
  for (let xi = 0; xi < GRID; xi++) {
    for (let yi = 0; yi < GRID; yi++) {
      for (let zi = 0; zi < GRID; zi++) {
        out.push([xi - offset, yi - offset, zi - offset] as const);
      }
    }
  }
  return out;
})();

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
  private wrapperEl: HTMLElement | null = null;
  private subcubes: HTMLElement[] = [];
  private rafId = 0;
  private _ready = false;

  // Pointer-driven explosion state
  private pointerX = -9999;
  private pointerY = -9999;
  private hoverTarget = 0; // 0 or 1
  private hoverActive = 0; // smoothed
  private rect: DOMRect | null = null;

  render() {
    if (!this._ready) {
      this._ready = true;
      requestAnimationFrame(() => this.init());
    }

    return html`
      <div class="cube-wrapper">
        <div class="cube-scene">
          <div class="cube">
            ${POSITIONS.map(
              ([x, y, z]) => html`
                <div
                  class="subcube"
                  data-x="${x}"
                  data-y="${y}"
                  data-z="${z}"
                >
                  <div class="sub-face front"></div>
                  <div class="sub-face back"></div>
                  <div class="sub-face right"></div>
                  <div class="sub-face left"></div>
                  <div class="sub-face top"></div>
                  <div class="sub-face bottom"></div>
                </div>
              `,
            )}
          </div>
        </div>
        <p class="cube-hint">Hover to fragment · drag to spin</p>
      </div>
    `;
  }

  private init() {
    this.cubeEl = this.querySelector(".cube") as HTMLElement;
    this.wrapperEl = this.querySelector(".cube-wrapper") as HTMLElement;
    if (!this.cubeEl || !this.wrapperEl) return;

    this.subcubes = Array.from(
      this.cubeEl.querySelectorAll<HTMLElement>(".subcube"),
    );

    // Place each sub-cube at its base position so first frame isn't (0,0,0).
    this.subcubes.forEach((el, i) => {
      const [px, py, pz] = POSITIONS[i];
      el.style.transform =
        `translate3d(${px * SPACING}px, ${py * SPACING}px, ${pz * SPACING}px)`;
    });

    this.addEventListener("mousedown", this.onMouseDown);
    this.addEventListener("touchstart", this.onTouchStart, { passive: false });
    this.addEventListener("mouseenter", this.onMouseEnter);
    this.addEventListener("mouseleave", this.onMouseLeave);
    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("touchmove", this.onTouchMove, { passive: false });
    window.addEventListener("mouseup", this.onPointerUp);
    window.addEventListener("touchend", this.onPointerUp);
    window.addEventListener("scroll", this.invalidateRect, { passive: true });
    window.addEventListener("resize", this.invalidateRect);

    this.refreshRect();
    this.animate();
  }

  disconnectedCallback() {
    cancelAnimationFrame(this.rafId);
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("touchmove", this.onTouchMove);
    window.removeEventListener("mouseup", this.onPointerUp);
    window.removeEventListener("touchend", this.onPointerUp);
    window.removeEventListener("scroll", this.invalidateRect);
    window.removeEventListener("resize", this.invalidateRect);
  }

  private invalidateRect = () => {
    this.rect = null;
  };

  private refreshRect() {
    if (this.wrapperEl) this.rect = this.wrapperEl.getBoundingClientRect();
  }

  private animate = () => {
    // Spin physics
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
      this.cubeEl.style.transform =
        `rotateX(${this.rotX}deg) rotateY(${this.rotY}deg)`;
    }

    // Smooth hover activation
    this.hoverActive += (this.hoverTarget - this.hoverActive) * 0.15;

    // Sub-cube displacement
    if (this.subcubes.length) {
      if (!this.rect) this.refreshRect();
      const rect = this.rect;
      if (rect) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const rxRad = (this.rotX * Math.PI) / 180;
        const ryRad = (this.rotY * Math.PI) / 180;
        const cosX = Math.cos(rxRad);
        const sinX = Math.sin(rxRad);
        const cosY = Math.cos(ryRad);
        const sinY = Math.sin(ryRad);

        const RADIUS = 130;
        const MAX_DISP = 70;

        for (let i = 0; i < this.subcubes.length; i++) {
          const [px, py, pz] = POSITIONS[i];
          const lx = px * SPACING;
          const ly = py * SPACING;
          const lz = pz * SPACING;

          // World = RotX * RotY * local (matches CSS `rotateX rotateY`)
          const x1 = cosY * lx + sinY * lz;
          const z1 = -sinY * lx + cosY * lz;
          const y2 = cosX * ly - sinX * z1;

          const screenX = centerX + x1;
          const screenY = centerY + y2;

          const dx = this.pointerX - screenX;
          const dy = this.pointerY - screenY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let factor = 0;
          if (this.hoverActive > 0.01 && dist < RADIUS) {
            const t = 1 - dist / RADIUS;
            factor = t * t * this.hoverActive; // ease-out falloff
          }

          // Outward direction in local space (center cube stays put)
          const len = Math.sqrt(px * px + py * py + pz * pz) || 1;
          const ox = (px / len) * MAX_DISP * factor;
          const oy = (py / len) * MAX_DISP * factor;
          const oz = (pz / len) * MAX_DISP * factor;

          this.subcubes[i].style.transform =
            `translate3d(${lx + ox}px, ${ly + oy}px, ${lz + oz}px)`;
        }
      }
    }

    this.rafId = requestAnimationFrame(this.animate);
  };

  private onMouseEnter = () => {
    this.hoverTarget = 1;
    this.refreshRect();
  };

  private onMouseLeave = () => {
    this.hoverTarget = 0;
    this.pointerX = -9999;
    this.pointerY = -9999;
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
    this.pointerX = e.clientX;
    this.pointerY = e.clientY;

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

// Touch SUB_SIZE so the unused-const linter (if any) stays quiet — it's also
// referenced implicitly via the CSS variable wired up in styles.css.
void SUB_SIZE;
