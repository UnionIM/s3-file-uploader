"use client";

import { useFPS } from "./useFps";

const FPS = () => {
  const fps = useFPS();

  return (
    <div className={`${fps < 40 ? "text-red-500" : "text-green-500"}`}>
      {fps}
    </div>
  );
};

export default FPS;
