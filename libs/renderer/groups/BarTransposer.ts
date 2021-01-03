import { noteHeight, pitchStringToOffset } from "../utilities";

export class BarTransposer {
  centerNoteOffset: number;

  constructor(public centerNote = "B5", private y = 0) {
    this.centerNoteOffset = pitchStringToOffset(centerNote);
  }

  pitchToY(pitch: string): number {
    const yOffset = (9 - pitchStringToOffset(pitch)) * (noteHeight / 2);
    return yOffset + this.y;
  }
}
