"use client";

import { FC, useRef, DragEvent, ChangeEvent } from "react";
import { FileDropzoneProps } from "./types";

const FileDropzone: FC<FileDropzoneProps> = ({
  onFilesSelected,
  className = "",
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onFilesSelected(e.dataTransfer.files);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onFilesSelected(e.target.files);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={handleClick}
      className={`border-2 border-dashed border-gray-400 p-6 rounded-xl text-center cursor-pointer ${className}`}
    >
      <p>Drop files here or click to select</p>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        multiple
        accept="image/*"
        onChange={handleChange}
      />
    </div>
  );
};

export default FileDropzone;
