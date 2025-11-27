import { UploadItem } from "@/(frontend)/shared/types/UploadItem";
import { useCallback, useEffect, useState } from "react";
import { getPresignedUrl } from "../utils";
import { IUseUploads } from "./types";
import axios from "axios";
import { IMediaItem } from "@/../shared/types/listMedia";

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

const useUpload = (): IUseUploads => {
  const [uploads, setUploads] = useState<UploadItem[]>([]);

  useEffect(() => {
    async function fetchExisting() {
      try {
        const { data: files } = await axios.get<IMediaItem[]>(
          "/api/media/list"
        );

        const items: UploadItem[] = files.map((f) => ({
          id: f.key,
          key: f.key,
          status: "done",
          progress: 100,
          uploadedUrl: f.url,
        }));

        setUploads(items);
      } catch (err) {
        console.error("Failed to fetch existing files:", err);
      }
    }

    fetchExisting();
  }, []);

  const uploadFile = useCallback(async (id: string, file: File) => {
    try {
      const { uploadUrl, publicUrl, key } = await getPresignedUrl(file);

      setUploads((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, status: "uploading", progress: 0 } : u
        )
      );

      await axios.put(uploadUrl, file, {
        onUploadProgress: (e) => {
          if (e.total) {
            const percent = Math.round((e.loaded / e.total) * 100);
            setUploads((prev) =>
              prev.map((u) => (u.id === id ? { ...u, progress: percent } : u))
            );
          }
        },
        headers: {
          "Content-Type": file.type,
        },
      });

      setUploads((prev) =>
        prev.map((u) =>
          u.id === id
            ? {
                ...u,
                status: "done",
                progress: 100,
                uploadedUrl: publicUrl,
                key,
              }
            : u
        )
      );
    } catch (err) {
      console.error("Upload failed:", err);
      setUploads((prev) =>
        prev.map((u) => (u.id === id ? { ...u, status: "error" } : u))
      );
    }
  }, []);

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files) return;

      const newUploads: UploadItem[] = [];
      const uploadPromises = [];

      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) continue;
        if (file.size > MAX_FILE_SIZE_BYTES) continue;

        const id = crypto.randomUUID();
        const previewUrl = URL.createObjectURL(file);

        const newUploadItem: UploadItem = {
          id,
          file,
          previewUrl,
          progress: 0,
          status: "pending",
          uploadedUrl: "",
        };

        newUploads.push(newUploadItem);
        uploadPromises.push(uploadFile(id, file));
      }

      if (newUploads.length > 0) {
        setUploads((prev) => [...prev, ...newUploads]);
      }

      await Promise.allSettled(uploadPromises);
    },
    [uploadFile]
  );

  return { uploads, setUploads, handleFiles };
};

export default useUpload;
