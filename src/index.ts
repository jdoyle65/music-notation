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

  renderCScale(ctx);
};

const renderCScale = (ctx: CanvasRenderingContext2D) => {
  const yMargin = 10;
  const gap = Math.round(Glyphs.NoteHead.Radius * 0.61666 * 2);
  const staff = new Glyphs.Staff(1000, gap);
  staff.y = yMargin;
  staff.draw(ctx);

  const cY = gap;
  const notes: NoteHead[] = new Array(8).fill(0).map((noop, i) => {
    const n = NoteHead.half();
    n.y = yMargin + cY * (4.5 - i * 0.5);
    n.x = i * gap + i * 20;
    return n;
  });

  notes.forEach((n) => {
    console.log(n.x, n.y);
    n.draw(ctx);
  });
};

init();
