"use client";

import { FC, useEffect, useState } from "react";

interface UploadLoaderProps {
  activeUploads: number;
}

const UploadLoader: FC<UploadLoaderProps> = ({ activeUploads }) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (activeUploads === 0) return;

    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, [activeUploads]);

  if (activeUploads === 0) return null;

  return (
    <div className="fixed top-4 right-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded shadow flex items-center gap-2">
      <div className="w-5 h-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <span className="text-sm text-gray-700">
        Uploading {activeUploads} file{activeUploads > 1 ? "s" : ""}
        {dots}
      </span>
    </div>
  );
};

export default UploadLoader;
