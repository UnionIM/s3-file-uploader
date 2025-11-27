"use client";

import MediaGrid from "@/(frontend)/entities/MediaGrid";
import FileDropzone from "@/(frontend)/shared/UI/FileDropzone";
import { UploadItem } from "@/(frontend)/shared/types/UploadItem";
import UploadLoader from "../UploadLoader";
import useUpload from "./hooks/useUpload";
import axios from "axios";

const UploadDropzone = () => {
  const { uploads, setUploads, handleFiles } = useUpload();

  const deleteFile = async (item: UploadItem) => {
    if (!item.key) return;

    const previousUploads = [...uploads];
    setUploads((prev) => prev.filter((u) => u.id !== item.id));

    try {
      await axios.post("/api/media/delete", { key: item.key });
    } catch (err) {
      console.error("Delete failed:", err);
      setUploads(previousUploads);
    }
  };

  return (
    <div>
      <UploadLoader
        activeUploads={uploads.filter(({ status }) => status !== "done").length}
      />
      <FileDropzone onFilesSelected={handleFiles} className="mt-4" />
      <MediaGrid uploads={uploads} onDelete={deleteFile} />
    </div>
  );
};

export default UploadDropzone;
