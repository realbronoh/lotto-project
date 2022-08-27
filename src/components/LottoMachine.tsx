import React, { useEffect, useRef, useState } from "react";
import { LottoBall } from "../utils/lottoBall";

export const LottoMachine = () => {
  const canvasRef = useRef(null);
  const [canvasTag, setCanvasTag] = useState<HTMLCanvasElement | null>(null);
  const DPR = devicePixelRatio;
  const CANVAS_STYLE_WIDTH = 500;
  const CANVAS_STYLE_HEIGHT = 500;
  const CENTER = {
    x: 250 * DPR,
    y: 250 * DPR,
  };

  const testfunc = () => {
    const ctx = canvasTag?.getContext("2d");
    if (!ctx) {
      return;
    }
    const testBall = new LottoBall();

    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(
      CENTER.x + testBall.pos.x,
      CENTER.y + testBall.pos.y,
      testBall.R,
      0,
      Math.PI * 2,
      true
    );
    ctx.stroke();
    ctx.fillStyle = "green";
    ctx.fill();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    setCanvasTag(canvas);
    if (canvasTag === null) return;
    canvasTag.width = DPR * CANVAS_STYLE_WIDTH;
    canvasTag.height = DPR * CANVAS_STYLE_HEIGHT;
  });

  return (
    <>
      <button
        style={{
          width: "30px",
          height: "15px",
          backgroundColor: "green",
        }}
        onClick={testfunc}
      >
        TEST
      </button>
      <canvas
        ref={canvasRef}
        style={{
          width: CANVAS_STYLE_WIDTH,
          height: CANVAS_STYLE_HEIGHT,
        }}
      ></canvas>
    </>
  );
};
