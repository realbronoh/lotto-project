import {
  BALL_COLOR,
  getDistanceSquare,
  getNormalVector,
  getPosAfterCollision,
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
    for (let i = 0; i < 1; i++) {
      // const posX = Math.pow(-1, i % 2) * Math.max(10, 230 * Math.random());
      const posX =
        (Math.random() > 0.5 ? 1 : -1) * Math.max(10, 220 * Math.random());
      const posY =
        (Math.random() > 0.5 ? 1 : -1) *
        Math.max(10, Math.sqrt(220 * 220 - posX * posX) * Math.random());
      const ball = new LottoBall({
        posX,
        posY,
        velX: (Math.random() - 1) * 3,
        velY: (Math.random() - 1) * 3,
        radius: 20,
        color: ballColors[Math.floor(Math.random() * 5)],
      });
      this.balls.push(ball);
    }
  }
  private handleCollision() {
    // // handle collision between balls
    // for (let i = 0; i < this.balls.length - 1; i++) {
    //   for (let j = i + 1; j < this.balls.length; j++) {
    //     const ball1 = this.balls[i];
    //     const ball2 = this.balls[j];
    //     const distanceSquare = getDistanceSquare(ball1.pos, ball2.pos);
    //     if (distanceSquare < 40 * 40) {
    //       const normalVector = getNormalVector(ball1.pos, ball2.pos);
    //       const overlapped = 40 - Math.sqrt(distanceSquare);
    //       ball1.pos = getPosAfterCollision(ball1.pos, normalVector, overlapped);
    //       ball2.pos = getPosAfterCollision(ball2.pos, normalVector, overlapped);
    //       ball1.vel = getVelAfterCollision(ball1.vel, normalVector);
    //       ball2.vel = getVelAfterCollision(ball2.vel, normalVector);
    //     }
    //   }
    // }

    // lastly handle collision with case
    const origin = { x: 0, y: 0 };
    this.balls.forEach((ball) => {
      const distanceSquare = getDistanceSquare(ball.pos, origin);
      if (distanceSquare >= 230 * 230) {
        const normalVector = getNormalVector(ball.pos, origin);
        const overlapped = Math.sqrt(distanceSquare) - 230;
        ball.pos = getPosAfterCollision(ball.pos, normalVector, overlapped);
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
