import Glyph from "./Glyph";

export class NoteHead extends Glyph {
  static readonly Radius = 20;
  static readonly Rotation = (Math.PI * -30) / 180;

  private width = NoteHead.Radius;
  private height = Math.round(this.width * 0.61666);

  constructor(protected filled = true, protected whole = false) {
    super();
  }

  draw(context: CanvasRenderingContext2D): void {
    const oldComposite = context.globalCompositeOperation;
    context.globalCompositeOperation = "xor";

    context.strokeStyle = this.color;

    context.beginPath();
    context.ellipse(
      this.x + this.width,
      this.y + this.height,
      this.whole ? this.width : Math.round(this.width * 0.75),
      this.whole ? this.height : Math.round(this.height * 0.75),
      this.whole ? 0 : NoteHead.Rotation,
      0,
      Math.PI * 2
    );
    context.fill();

    if (!this.filled) {
      const xRadius = Math.round(
        this.whole ? this.width * 0.5 : this.width * 0.75
      );

      const yRadius = Math.round(
        this.whole ? this.height * 0.85 : this.height * 0.3
      );

      context.beginPath();
      context.ellipse(
        this.x + this.width,
        this.y + this.height,
        this.whole ? xRadius : Math.round(xRadius * 0.8),
        this.whole ? yRadius : Math.round(yRadius * 0.8),
        NoteHead.Rotation,
        0,
        Math.PI * 2
      );
      context.fill();
    }

    context.globalCompositeOperation = oldComposite;
  }

  static whole(): NoteHead {
    return new NoteHead(false, true);
  }

  static half(): NoteHead {
    return new NoteHead(false);
  }

  static default(): NoteHead {
    return new NoteHead();
  }
}
