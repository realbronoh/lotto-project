import React, { useEffect, useRef, useState } from "react";
import { Layer } from "../utils/layer";

export const LottoMachine = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [layers, setLayers] = useState<Layer[]>([]);
  const DPR = devicePixelRatio;
  const CANVAS_STYLE_WIDTH = 500;
  const CANVAS_STYLE_HEIGHT = 500;
  const CENTER = {
    x: 250 * DPR,
    y: 250 * DPR,
  };

  useEffect(() => {
    console.log("############");
    const canvas = canvasRef.current;

    const newLayers = [];
    for (let i = 0; i < 5; i++) {
      const layer = new Layer();
      newLayers.push(layer);
    }
    setLayers(newLayers);
    console.log("layers: ", layers);
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
    ctx.arc(CENTER.x, CENTER.y, 250, 0, Math.PI * 2, true);
    ctx.stroke();
  };
  const draw = () => {
    layers.forEach((layer) => {
      layer.draw(canvasRef.current, CENTER);
    });
    drawShowCase();
  };

  return (
    <>
      <button
        style={{
          width: "30px",
          height: "15px",
          backgroundColor: "green",
        }}
        onClick={() => {
          draw();
        }}
      >
        TEST
      </button>
      <canvas
        ref={canvasRef}
        style={{
          width: CANVAS_STYLE_WIDTH,
          height: CANVAS_STYLE_HEIGHT,
        }}
        width={DPR * CANVAS_STYLE_WIDTH}
        height={DPR * CANVAS_STYLE_HEIGHT}
      ></canvas>
    </>
  );
};
