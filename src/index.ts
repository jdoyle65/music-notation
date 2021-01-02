import { Groups } from "../libs/renderer";
import { Note } from "../libs/renderer/groups";

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

  ctx.scale(2, 2);

  renderCScale(ctx);
};

const renderCScale = (ctx: CanvasRenderingContext2D) => {
  const yMargin = 10;

  const notes: Note[] = [
    {
      pitch: "C4",
      duration: "half",
    },
    {
      pitch: "D4",
      duration: "half",
    },
    {
      pitch: "E4",
      duration: "half",
    },
    {
      pitch: "F4",
      duration: "half",
    },
    {
      pitch: "G4",
      duration: "half",
    },
  ];

  const bar = new Groups.Bar(notes);
  bar.draw(ctx);
};

init();
