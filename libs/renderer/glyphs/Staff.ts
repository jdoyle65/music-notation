import Glyph from "./Glyph";

export class Staff extends Glyph {
  constructor(protected width: number, protected size: number) {
    super();
  }

  draw(context: CanvasRenderingContext2D): void {
    const lines = 5;

    for (let i = 0; i < lines; i++) {
      context.strokeStyle = "#999";
      context.beginPath();
      context.lineTo(this.x, this.y + i * this.size);
      context.lineTo(this.x + this.width, this.y + i * this.size);
      context.stroke();
    }
  }
}
