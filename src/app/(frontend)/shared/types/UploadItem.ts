export interface UploadItem {
  id: string;
  file?: File;
  previewUrl?: string;
  progress: number;
  status: "pending" | "uploading" | "done" | "error";
  uploadedUrl: string;
  key?: string;
}
