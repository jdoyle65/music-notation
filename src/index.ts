import { Glyphs } from "../libs/renderer";

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
  const note = Glyphs.Note.whole();
  note.draw(ctx);
};

init();
