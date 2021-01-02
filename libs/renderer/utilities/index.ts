export const noteHeight = 24;
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
  const parts = pitch.match(/([A-G])(#|bb?|x)?([0-9])/);

  if (!parts) {
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

export interface PitchData {
  note: string;
  accidental: string;
  octave: number;
}
