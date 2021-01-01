import { Glyphs } from "../libs/renderer";
import { NoteHead } from "../libs/renderer/glyphs";

const init = () => {
  const body = document.body;
  const canvas = document.createElement("canvas");
  canvas.width = 1000;
  canvas.height = 750;
  canvas.style.width = "500px";
  canvas.style.height = "375px";
  body.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2D context");
  }

  console.log("Initialized!");

  ctx.scale(2, 2);

  const yMargin = 10;

  const whole = Glyphs.NoteHead.whole();
  whole.y = yMargin;
  const half = Glyphs.NoteHead.half();
  half.y = yMargin;
  const quarter = Glyphs.NoteHead.default();
  quarter.y = yMargin;

  half.x = whole.x + Glyphs.NoteHead.Radius * 2 + 20;
  quarter.x = half.x + Glyphs.NoteHead.Radius * 2 + 20;

  whole.draw(ctx);
  half.draw(ctx);
  quarter.draw(ctx);

  ctx.beginPath();
  ctx.lineTo(0, yMargin);
  ctx.lineTo(1000, yMargin);
  ctx.stroke();

  const yBottom = Math.round(NoteHead.Radius * 0.61666) * 2;
  ctx.beginPath();
  ctx.lineTo(0, yMargin + yBottom);
  ctx.lineTo(1000, yMargin + yBottom);
  ctx.stroke();
};

init();
