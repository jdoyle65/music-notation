import Glyph from "./Glyph";

import { noteWidth, noteHeight } from "../utilities";

export class NoteHead extends Glyph {
  static readonly Rotation = (Math.PI * -30) / 180;

  private xRadius = Math.round(noteWidth / 2);
  private yRadius = Math.round(noteHeight / 2);

  constructor(protected filled = true, protected whole = false) {
    super();
  }

  hasStem(): boolean {
    return !this.whole;
  }

  draw(context: CanvasRenderingContext2D): void {
    const oldComposite = context.globalCompositeOperation;

    context.strokeStyle = this.color;

    context.beginPath();
    context.ellipse(
      Math.round(this.x + this.xRadius),
      Math.round(this.y + this.yRadius),
      Math.round(this.whole ? this.xRadius : this.xRadius * 0.8),
      Math.round(this.whole ? this.yRadius : this.yRadius * 0.8),
      this.whole ? 0 : NoteHead.Rotation,
      0,
      Math.PI * 2
    );
    context.fill();
    context.closePath();

    if (!this.filled) {
      context.globalCompositeOperation = "xor";

      const xRadius = Math.round(
        this.whole ? this.xRadius * 0.5 : this.xRadius * 0.75
      );

      const yRadius = Math.round(
        this.whole ? this.yRadius * 0.85 : this.yRadius * 0.3
      );

      context.beginPath();
      context.ellipse(
        Math.round(this.x + this.xRadius),
        Math.round(this.y + this.yRadius),
        Math.round(this.whole ? xRadius : xRadius * 0.9),
        Math.round(this.whole ? yRadius : yRadius * 0.9),
        NoteHead.Rotation,
        0,
        Math.PI * 2
      );

      context.fill();
      context.closePath();
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

  static fromDuration(duration: Duration): NoteHead {
    switch (duration) {
      case "whole":
        return NoteHead.whole();
      case "half":
        return NoteHead.half();
      default:
        return NoteHead.default();
    }
  }
}

export type Duration = "whole" | "half" | "quarter";
