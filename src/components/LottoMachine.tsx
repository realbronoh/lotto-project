import React, { useEffect, useRef, useState } from "react";
import { Layer } from "../utils/layer";

export const LottoMachine = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [layers, setLayers] = useState<Layer[]>([]);
  const DPR = devicePixelRatio;
  const CANVAS_STYLE_WIDTH = 500;
  const CANVAS_STYLE_HEIGHT = 500;
  const CENTER = {
    x: 250,
    y: 250,
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    const newLayers = [];
    for (let i = 0; i < 45; i++) {
      const layer = new Layer();
      newLayers.push(layer);
    }
    setLayers(newLayers);
  }, []);

  const drawShowCase = () => {
    const canvas = canvasRef.current;
    if (canvas === null) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    ctx.beginPath();
    ctx.arc(CENTER.x * DPR, CENTER.y * DPR, 250 * DPR, 0, Math.PI * 2, true);
    ctx.stroke();
  };

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas === null) {
      return;
    }
    canvas.width = canvas.width;
  };

  const draw = () => {
    initCanvas();
    layers.forEach((layer) => {
      layer.draw(canvasRef.current, CENTER);
    });
    drawShowCase();
    requestAnimationFrame(draw);
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          width: CANVAS_STYLE_WIDTH,
          height: CANVAS_STYLE_HEIGHT,
        }}
        width={DPR * CANVAS_STYLE_WIDTH}
        height={DPR * CANVAS_STYLE_HEIGHT}
      ></canvas>
      <button
        style={{
          width: "100px",
          height: "50px",
          backgroundColor: "green",
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
        onClick={() => {
          draw();
        }}
      >
        TEST
      </button>
    </>
  );
};
