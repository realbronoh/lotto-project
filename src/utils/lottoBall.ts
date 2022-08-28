const DELTA = 0.2;
const GRAV = 2;

export class LottoBall implements Ball {
  public pos: Position2D;
  public vel: Velocity2D;
  public radius: number;
  public color: string;

  constructor(initOption: {
    posX: number;
    posY: number;
    velX: number;
    velY: number;
    radius: number;
    color: BALL_COLOR;
  }) {
    const { posX, posY, velX, velY, radius, color } = initOption;
    this.radius = radius;
    this.pos = { x: posX, y: posY };
    this.vel = { x: velX, y: velY };
    this.color = color;
  }

  static nextPos(pos: Position2D, vel: Velocity2D) {
    return {
      x: pos.x + vel.x * DELTA,
      y: pos.y + vel.y * DELTA + 0.5 * GRAV * DELTA * DELTA,
    };
  }
  static nextVel(vel: Velocity2D) {
    return {
      x: vel.x,
      y: vel.y + GRAV * DELTA,
    };
  }
}

// util functions

export const dotProduct = (vec1: Vector2D, vec2: Vector2D) => {
  return vec1.x * vec2.x + vec1.y * vec2.y;
};

export const getNormalVector = (vec1: Vector2D, vec2: Vector2D) => {
  const delta = {
    x: vec1.x - vec2.x,
    y: vec1.y - vec2.y,
  };
  const size = Math.sqrt(dotProduct(delta, delta));
  return {
    x: delta.x / size,
    y: delta.y / size,
  };
};

export const getPosAfterCollision = (
  pos: Vector2D,
  normalVector: Vector2D,
  overlapped: number
) => {
  // const normalDirectionSign = Math.sign(dotProduct(pos, normalVector));
  return {
    x: 230 * normalVector.x,
    y: 230 * normalVector.y,
  };
};

export const getVelAfterCollision = (vel: Vector2D, normalVector: Vector2D) => {
  const normalDirectionPortion = dotProduct(vel, normalVector);
  return {
    x: (vel.x - 2 * normalDirectionPortion * normalVector.x) * 0.9,
    y: (vel.y - 2 * normalDirectionPortion * normalVector.y) * 0.9,
  };
};

export const getDistanceSquare = (vec1: Vector2D, vec2: Vector2D) => {
  return (
    (vec1.x - vec2.x) * (vec1.x - vec2.x) +
    (vec1.y - vec2.y) * (vec1.y - vec2.y)
  );
};

// util functions end
// types

export interface Vector2D {
  x: number;
  y: number;
}
export interface Position2D extends Vector2D {}
export interface Velocity2D extends Vector2D {}

export interface Ball {
  pos: Position2D;
  vel: Velocity2D;
  radius: number;
  color?: string;
}

export enum BALL_COLOR {
  RED = "RED",
  BLUE = "BLUE",
  GREEN = "GREEN",
  YELLOW = "YELLOW",
  BLACK = "BLACK",
}

// types end
