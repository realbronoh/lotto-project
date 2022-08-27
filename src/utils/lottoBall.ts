const DELTA = 1;

export class LottoBall implements Ball {
  public pos: Position2D;
  public vel: Velocity2D;
  public R: number;
  public color: string;

  constructor() {
    this.R = 20;
    this.pos = { x: 0, y: 0 };
    this.vel = { x: 0, y: 0 };
    this.color = BALL_COLOR.RED;
  }

  static nextPos(pos: Position2D, vel: Velocity2D, grav: number) {
    return {
      x: pos.x + vel.x * DELTA,
      y: pos.y + vel.y * DELTA + 0.5 * grav * DELTA * DELTA,
    };
  }
  static nextVel(vel: Velocity2D, grav: number) {
    return {
      x: vel.x,
      y: vel.y + grav * DELTA,
    };
  }
}

// util functions

const dotProduct = (vec1: Vecter2D, vec2: Vecter2D) => {
  return vec1.x * vec2.x + vec1.y + vec2.y;
};

// util functions end
// types

export interface Vecter2D {
  x: number;
  y: number;
}
export interface Position2D extends Vecter2D {}
export interface Velocity2D extends Vecter2D {}

export interface Ball {
  pos: Position2D;
  vel: Velocity2D;
  R: number;
  color?: string;
}

export enum BALL_COLOR {
  RED = "RED",
  BLUE = "BLUE",
  GREEN = "GREEN",
  YELLOW = "YELLOW",
}

// types end
