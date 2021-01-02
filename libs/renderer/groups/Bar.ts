import { Duration, NoteHead, Staff } from "../glyphs";
import { noteHeight, noteWidth, pitchStringToOffset } from "../utilities";

export class Bar {
  get width(): number {
    return this.staff?.width ?? 0;
  }

  protected noteHeads: NoteHead[];
  protected ledgerLines: { x: number; y: number }[] = [];
  protected staff: Staff;

  private noteHeight: number;
  private noteOffset: number;
  private middleCOffset: number;

  constructor(
    public x = 0,
    public y = 0,
    public notes: Note[],
    public clef: Clef = "treble",
    public key: string = "C",
    public timeSignature: string = "4/4"
  ) {
    const width = notes.length * noteWidth;
    this.noteHeight = noteHeight;
    this.noteOffset = noteHeight / 2;
    this.staff = new Staff(width, this.noteHeight);
    this.staff.x += this.x;
    this.staff.y += this.y;

    // TODO: Adjust to clef
    this.middleCOffset = 9;

    this.noteHeads = notes.map((n, i) => {
      const head = this.buildNoteHead(n);

      head.x += i * noteWidth + this.x;
      head.y += this.y;

      return head;
    });
  }

  draw(context: CanvasRenderingContext2D): void {
    this.staff.draw(context);
    this.drawBarEnds(context);

    this.noteHeads.forEach((n) => n.draw(context));
    this.ledgerLines.forEach((l) => {
      context.beginPath();
      context.lineTo(Math.round(l.x + this.x), Math.round(l.y + this.y));
      context.lineTo(
        Math.round(l.x + noteWidth + this.x),
        Math.round(l.y + this.y)
      );
      context.strokeStyle = Staff.Color;
      context.stroke();
    });
  }

  private drawBarEnds(context: CanvasRenderingContext2D): void {
    const left = this.staff.x;
    const right = this.staff.x + this.staff.width;
    const top = this.staff.y;
    const bottom = this.staff.y + this.staff.height;

    context.beginPath();
    context.lineTo(Math.round(left), Math.round(top));
    context.lineTo(Math.round(left), Math.round(bottom));
    context.strokeStyle = Staff.Color;
    context.stroke();

    context.beginPath();
    context.lineTo(Math.round(right), Math.round(top));
    context.lineTo(Math.round(right), Math.round(bottom));
    context.strokeStyle = Staff.Color;
    context.stroke();
  }

  isValid(): boolean {
    // TODO: Needs to be enhanced with further durations as they're added
    const totalDuration = this.notes
      .map((note) => {
        switch (note.duration) {
          case "whole":
            return 1;
          case "half":
            return 0.5;
          case "quarter":
            return 0.25;
        }
      })
      .reduce((total, duration) => total + duration, 0);

    const meterValue = this.getMeterValue();

    // TODO: Needs to be approximated for fractional values
    return meterValue === totalDuration;
  }

  private getMeterValue(): number {
    const parts = this.timeSignature.split("/").map((p) => parseInt(p));

    return parts[0] / parts[1];
  }

  protected buildNoteHead(note: Note): NoteHead {
    const noteHead = NoteHead.fromDuration(note.duration);
    const offset = pitchStringToOffset(note.pitch);

    noteHead.y = (this.noteHeight / 2) * (-offset + this.middleCOffset);

    return noteHead;
  }
}

export interface Note {
  pitch: string;
  duration: Duration;
}

export type Clef = "treble" | "tenor" | "bass";
