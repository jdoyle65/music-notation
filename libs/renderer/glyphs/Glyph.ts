export default abstract class {
  x = 0;
  y = 0;
  color = "black";

  abstract draw(context: CanvasRenderingContext2D): void;
}
