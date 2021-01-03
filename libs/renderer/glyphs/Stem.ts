import { noteHeight, noteWidth } from "../utilities";
import Glyph from "./Glyph";
import { NoteHead } from "./NoteHead";

export class Stem extends Glyph {
  direction: Direction = "up";

  constructor(public length: number = (noteHeight / 2) * 7) {
    super();
  }

  draw(context: CanvasRenderingContext2D): void {
    const x = Math.round(
      this.direction === "up" ? this.x - noteWidth / 6 : this.x + noteWidth / 6
    );
    context.beginPath();
    context.lineTo(x, Math.round(this.y));
    context.lineTo(
      x,
      Math.round(
        this.direction === "up" ? this.y - this.length : this.y + this.length
      )
    );
    context.strokeStyle = "black";
    context.lineWidth = 1;
    context.stroke();
  }

  static forNoteHead(noteHead: NoteHead, direction: Direction = "up"): Stem {
    const stem = new Stem();
    stem.direction = direction;
    stem.y = noteHead.y + noteHeight / 2;
    stem.x = direction === "up" ? noteHead.x + noteWidth : noteHead.x;

    return stem;
  }
}

export type Direction = "up" | "down";
