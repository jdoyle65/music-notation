export const noteHeight = 10;
export const noteWidth = 1.62 * noteHeight;

/**
 * Converts scientific pitch notation string into its individual
 * pieces
 *
 * @see https://en.wikipedia.org/wiki/Scientific_pitch_notation
 *
 * @param pitch Scientific pitch notation string
 */
export const decodePitchString = (pitch: string): PitchData => {
  const regex = /^([A-Ga-g])(#|bb?|x)?([0-9])$/;
  const parts = pitch.match(regex);

  if (!parts || !regex.test(pitch)) {
    throw new TypeError(`Unexpected pitch string: ${pitch}`);
  }

  const [, note, accidental, octave] = parts;

  return {
    note,
    accidental,
    octave: Number(octave),
  };
};

/**
 * Returns the line/space offset in a staff from middle C (C4)
 */
export const pitchStringToOffset = (pitch: string): number => {
  return pitchDataToOffset(decodePitchString(pitch));
};

export const pitchDataToOffset = (pitchData: PitchData): number => {
  const { note, octave } = pitchData;
  const noteOffset = note.toUpperCase().charCodeAt(0) - 65;
  const middleCOffset = 30;

  return noteOffset + octave * 7 - middleCOffset;
};

export const parseBarShorthand = (bar: string) => {
  return bar.split(/\s+/).map((b) => parseNoteShorthand(b));
};

export const parseNoteShorthand = (note: string) => {
  const [pitch, duration] = note.split("-");

  return {
    pitch,
    duration: parseDurationShorthand(parseInt(duration)),
  };
};

export const parseDurationShorthand = (duration: number) => {
  switch (duration) {
    case 1:
      return "whole";
    case 2:
      return "half";
    case 4:
      return "quarter";
    default:
      return "quarter";
  }
};

export interface PitchData {
  note: string;
  accidental: string;
  octave: number;
}
