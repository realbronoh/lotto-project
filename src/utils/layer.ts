import { BALL_COLOR, LottoBall, Position2D } from "./lottoBall";

const ballColors = [
  BALL_COLOR.RED,
  BALL_COLOR.GREEN,
  BALL_COLOR.BLUE,
  BALL_COLOR.YELLOW,
  BALL_COLOR.BLACK,
];
export class Layer {
  public balls: LottoBall[] = [];
  constructor() {
    this.init();
  }

  init() {
    for (let i = 0; i < 4; i++) {
      const posX =
        Math.pow(-1, i < 2 ? 0 : 1) * Math.max(10, 230 * Math.random());
      const posY =
        Math.pow(-1, i) *
        Math.max(10, Math.sqrt(240 * 240 - posX * posX) * Math.random());
      const ball = new LottoBall({
        posX,
        posY,
        velX: Math.random() - 1,
        velY: Math.random() - 1,
        color: ballColors[Math.floor(Math.random() * 5)],
      });
      this.balls.push(ball);
    }
  }

  draw(canvas: HTMLCanvasElement | null, center: Position2D) {
    if (canvas === null) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    this.balls.forEach((ball) => {
      ctx.beginPath();
      ctx.arc(
        center.x + ball.pos.x,
        center.y + ball.pos.y,
        ball.R,
        0,
        Math.PI * 2,
        true
      );
      ctx.stroke();
      ctx.fillStyle = ball.color;
      ctx.fill();
    });
  }
  // TODO: 충돌 검사함수
}
