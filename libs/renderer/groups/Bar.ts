import { Duration, NoteHead, Staff } from "../glyphs";
import { Stem } from "../glyphs/Stem";
import { noteHeight, noteWidth, pitchStringToOffset } from "../utilities";
import { BarTransposer } from "./BarTransposer";

export class Bar {
  get width(): number {
    return this.staff?.width ?? 0;
  }

  protected notes: NoteData[];
  protected ledgerLines: { x: number; y: number }[] = [];
  protected staff: Staff;

  private noteHeight: number;
  private noteOffset: number;
  private middleCOffset: number;
  private transposer: BarTransposer;

  constructor(
    public x = 0,
    public y = 0,
    notes: Note[],
    public clef: Clef = "treble",
    public key: string = "C",
    public timeSignature: string = "4/4"
  ) {
    this.transposer = new BarTransposer("B5", this.y);
    const width = notes.length * noteWidth;
    this.noteHeight = noteHeight;
    this.noteOffset = noteHeight / 2;
    this.staff = new Staff(width, this.noteHeight);
    this.staff.x += this.x;
    this.staff.y += this.y;

    // TODO: Adjust to clef
    this.middleCOffset = 9;

    this.notes = notes.map((n, i) => {
      const head = this.buildNoteHead(n);

      head.x += i * noteWidth + this.x;
      head.y = this.transposer.pitchToY(n.pitch);

      const noteData: NoteData = { ...n, head };

      if (head.hasStem()) {
        noteData.stem = this.buildStem(noteData);
      }

      this.addLedgers(noteData);

      return noteData;
    });
  }

  draw(context: CanvasRenderingContext2D): void {
    this.staff.draw(context);
    this.drawBarEnds(context);

    this.ledgerLines.forEach((l) => {
      context.beginPath();
      context.lineTo(Math.round(l.x), Math.round(l.y));
      context.lineTo(Math.round(l.x + noteWidth), Math.round(l.y));
      context.strokeStyle = Staff.Color;
      context.lineWidth = 1;
      context.stroke();
    });

    this.notes.forEach((n) => {
      n.head.draw(context);
      n.stem?.draw(context);
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

  protected buildStem(note: NoteData): Stem {
    const centerNoteOffset = this.transposer.centerNoteOffset;
    const offset = pitchStringToOffset(note.pitch);
    const stem = Stem.forNoteHead(
      note.head,
      offset <= centerNoteOffset ? "up" : "down"
    );

    if (offset <= 0) {
      stem.length = (noteHeight / 2) * (centerNoteOffset - offset);
    } else if (offset >= 12) {
      stem.length = (noteHeight / 2) * (offset - centerNoteOffset);
    }

    return stem;
  }

  protected addLedgers(note: NoteData): void {
    const centerNoteOffset = this.transposer.centerNoteOffset;
    const offset = pitchStringToOffset(note.pitch);

    if (offset <= centerNoteOffset - 6) {
      const ledgerCount = Math.floor(centerNoteOffset - 6 - offset / 2 + 1);

      new Array(ledgerCount).fill("").map((l, i) => {
        this.ledgerLines.push({
          x: note.head.x,
          y: this.staff.y + this.staff.height + noteHeight * (i + 1),
        });
      });
    } else if (offset >= centerNoteOffset + 6) {
      const ledgerCount = Math.floor(offset / 2 - centerNoteOffset + 1);

      new Array(ledgerCount).fill("").map((l, i) => {
        this.ledgerLines.push({
          x: note.head.x,
          y: this.staff.y - noteHeight * (i + 1),
        });
      });
    }
  }
}

export interface Note {
  pitch: string;
  duration: Duration;
}

export interface NoteData extends Note {
  head: NoteHead;
  stem?: Stem;
}

export type Clef = "treble" | "alto" | "bass";
