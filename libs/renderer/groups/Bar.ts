import { Duration, NoteHead, Staff } from "../glyphs";
import { noteHeight, noteWidth, pitchStringToOffset } from "../utilities";

export class Bar {
  protected noteHeads: NoteHead[];
  protected ledgerLines: { x: number; y: number }[] = [];
  protected staff: Staff;

  private noteHeight: number;
  private noteOffset: number;
  private middleCOffset: number;

  constructor(
    public notes: Note[],
    public clef: Clef = "treble",
    public key: string = "C",
    public timeSignature: string = "4/4"
  ) {
    const width = notes.length * noteWidth;
    this.noteHeight = noteHeight;
    this.noteOffset = noteHeight / 2;
    this.staff = new Staff(width, this.noteHeight);

    // TODO: Adjust to clef
    this.middleCOffset = 9;

    this.noteHeads = notes.map((n, i) => {
      const head = this.buildNoteHead(n);

      head.x += i * noteWidth;

      return head;
    });
  }

  draw(context: CanvasRenderingContext2D): void {
    this.staff.draw(context);
    this.noteHeads.forEach((n) => n.draw(context));
    this.ledgerLines.forEach((l) => {
      context.beginPath();
      context.lineTo(Math.round(l.x), Math.round(l.y));
      context.lineTo(Math.round(l.x + noteWidth), Math.round(l.y));
      context.strokeStyle = Staff.Color;
      context.stroke();
    });
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
