import {
  BALL_COLOR,
  dotProduct,
  getDistanceSquare,
  getNormalVector,
  getVelAfterCollision,
  LottoBall,
  Position2D,
} from "./lottoBall";

const ballColors = [
  BALL_COLOR.RED,
  BALL_COLOR.GREEN,
  BALL_COLOR.BLUE,
  BALL_COLOR.YELLOW,
  BALL_COLOR.BLACK,
];

const DPR = devicePixelRatio;

export class Layer {
  public balls: LottoBall[] = [];
  constructor() {
    this.init();
  }

  /**
   * init layers: 2 balls
   */
  private init() {
    for (let i = 0; i < 2; i++) {
      const posX = Math.pow(-1, i) * Math.max(10, 230 * Math.random());
      const posY =
        (Math.random() > 0.5 ? 1 : -1) *
        Math.max(10, Math.sqrt(240 * 240 - posX * posX) * Math.random());
      const ball = new LottoBall({
        posX,
        posY,
        velX: (Math.random() - 1) * 2,
        velY: (Math.random() - 1) * 2,
        radius: 20,
        color: ballColors[Math.floor(Math.random() * 5)],
      });
      this.balls.push(ball);
    }
  }
  private handleCollision() {
    // handle collision between balls
    for (let i = 0; i < this.balls.length - 1; i++) {
      for (let j = i + 1; j < this.balls.length; j++) {
        const ball1 = this.balls[i];
        const ball2 = this.balls[j];
        if (getDistanceSquare(ball1.pos, ball2.pos) < 20 * 20) {
          const normalVector = getNormalVector(ball1.pos, ball2.pos);
          ball1.vel = getVelAfterCollision(ball1.vel, normalVector);
          ball2.vel = getVelAfterCollision(ball2.vel, normalVector);
        }
      }
    }

    // lastly handle collision with case
    const origin = { x: 0, y: 0 };
    this.balls.forEach((ball) => {
      if (getDistanceSquare(ball.pos, origin) > 230 * 230) {
        console.log("### COLLISION WITH CASE!! ###");
        const normalVector = getNormalVector(ball.pos, origin);
        console.log(ball);
        console.log("normal vector at collision: ", normalVector);
        console.log(
          "normal vector size: ",
          dotProduct(normalVector, normalVector)
        );
        ball.pos = {
          x: ball.pos.x * 0.95,
          y: ball.pos.y * 0.95,
        };
        ball.vel = getVelAfterCollision(ball.vel, normalVector);
      }
    });
  }

  private next() {
    this.balls = this.balls.map((ball) => {
      const { pos, vel } = ball;
      return {
        ...ball,
        pos: LottoBall.nextPos(pos, vel),
        vel: LottoBall.nextVel(vel),
      };
    });
  }

  /**
   * draw all balls in layer
   * @param canvas
   * @param center
   * @returns
   */
  public draw(canvas: HTMLCanvasElement | null, center: Position2D) {
    if (canvas === null) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    // TODO: next move
    this.next();

    // TODO: collision
    this.handleCollision();

    this.balls.forEach((ball) => {
      ctx.beginPath();
      ctx.arc(
        (center.x + ball.pos.x) * DPR,
        (center.y + ball.pos.y) * DPR,
        ball.radius * DPR,
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
