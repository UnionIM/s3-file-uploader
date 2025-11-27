"use client";

import Image from "next/image";
import React from "react";
import DeleteButton from "@/(frontend)/shared/UI/DeleteButton";
import { MediaGridProps } from "./types";

const MediaGrid: React.FC<MediaGridProps> = ({ uploads, onDelete }) => {
  return (
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 auto-rows-min">
      {uploads.map((u) => (
        <div
          key={u.id}
          className="relative rounded overflow-hidden shadow-sm bg-gray-100"
        >
          {u.uploadedUrl || u.previewUrl ? (
            <div className="relative w-full" style={{ paddingBottom: "100%" }}>
              <Image
                src={u.uploadedUrl || u.previewUrl!}
                alt="uploaded"
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                className={`transition-opacity duration-300 ${
                  u.status === "uploading" ? "opacity-70" : "opacity-100"
                }`}
              />
            </div>
          ) : (
            <div className="w-full h-32 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-sm">No preview</span>
            </div>
          )}

          {u.status === "uploading" && (
            <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-200">
              <div
                className="h-full bg-blue-500"
                style={{ width: `${u.progress}%` }}
              />
            </div>
          )}

          {u.status === "done" && <DeleteButton onClick={() => onDelete(u)} />}

          {u.status === "error" && (
            <p className="absolute inset-0 flex items-center justify-center bg-red-100 text-red-500 text-sm font-medium">
              Failed to upload
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default MediaGrid;
