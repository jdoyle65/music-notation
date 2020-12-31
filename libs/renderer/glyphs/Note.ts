import Glyph from "./Glyph";

export class Note extends Glyph {
  protected filled: boolean;

  x: number;
  y: number;

  constructor() {
    super();
    this.filled = true;
    this.x = 10;
    this.y = 10;
  }

  draw(context: CanvasRenderingContext2D): void {
    const xRadius = 50;
    const yRadius = Math.round(xRadius * 0.61666);
    const oldComposite = context.globalCompositeOperation;
    context.globalCompositeOperation = "xor";

    context.strokeStyle = "black";
    context.beginPath();
    context.ellipse(
      this.x + xRadius,
      this.y + xRadius,
      xRadius,
      yRadius,
      0,
      0,
      Math.PI * 2
    );
    context.fill();

    context.beginPath();
    context.ellipse(
      this.x + xRadius,
      this.x + xRadius,
      Math.round(xRadius * 0.5),
      Math.round(yRadius * 0.85),
      (330 * Math.PI) / 180,
      0,
      Math.PI * 2
    );
    context.fill();

    context.globalCompositeOperation = oldComposite;
  }

  static whole(): Note {
    const note = new Note();

    note.filled = false;

    return note;
  }
}
