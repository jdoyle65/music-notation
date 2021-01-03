import { Groups } from "../libs/renderer";
import { Note } from "../libs/renderer/groups";
import { parseBarShorthand } from "../libs/renderer/utilities";

const init = () => {
  const body = document.body;
  const canvas = document.createElement("canvas");
  canvas.width = 1000;
  canvas.height = 750;
  canvas.style.width = `${canvas.width * 0.75}px`;
  canvas.style.height = `${canvas.height * 0.75}px`;
  body.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2D context");
  }

  ctx.scale(2, 2);

  render(ctx);
};

const renderBars = (
  ctx: CanvasRenderingContext2D,
  bars: string[],
  yOffset: number
): void => {
  let lastBar: Groups.Bar | undefined;

  const barGlyphs = bars
    .map((bar) => parseBarShorthand(bar))
    .map((bar) => {
      const barGlyph = new Groups.Bar(
        lastBar ? lastBar.x + lastBar.width : 0,
        yOffset,
        bar as Groups.Note[]
      );
      lastBar = barGlyph;

      return barGlyph;
    });

  barGlyphs.forEach((bar) => {
    if (!bar.isValid()) {
      console.error("Invalid bar found");
    }
  });

  barGlyphs.forEach((bar) => bar.draw(ctx));
};

const render = (ctx: CanvasRenderingContext2D) => {
  // const bars: string[] = ["d4-2 e4-4 g4-4", "f4-2 g4-2"];
  // const bars2: string[] = ["f4-4 b5-4 d5-2", "c5-1"];

  renderBars(ctx, ["c4-4 a4-4 c6-4 d6-4", "f5-4 g5-4 a6-4 b6-4"], 50);
  // renderBars(ctx, bars, 0);
  // renderBars(ctx, bars2, 200);
};

init();
