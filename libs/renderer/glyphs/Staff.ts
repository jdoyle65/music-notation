import Glyph from "./Glyph";

export class Staff extends Glyph {
  static readonly Color = "#999";

  height: number;

  constructor(public width: number, public size: number) {
    super();
    this.height = size * 4;
  }

  draw(context: CanvasRenderingContext2D): void {
    const lines = 5;

    for (let i = 0; i < lines; i++) {
      context.strokeStyle = Staff.Color;
      context.beginPath();
      context.lineTo(Math.round(this.x), Math.round(this.y + i * this.size));
      context.lineTo(
        Math.round(this.x + this.width),
        Math.round(this.y + i * this.size)
      );
      context.stroke();
    }
  }
}
