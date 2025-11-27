import { useEffect, useState } from "react";

export function useFPS() {
  const [fps, setFps] = useState(60);

  useEffect(() => {
    let last = performance.now();
    let frames = 0;

    function loop(now: number) {
      frames++;
      const diff = now - last;

      if (diff >= 1000) {
        setFps(frames);
        frames = 0;
        last = now;
      }

      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
  }, []);

  return fps;
}
