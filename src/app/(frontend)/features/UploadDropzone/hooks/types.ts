import { UploadItem } from "@/(frontend)/shared/types/UploadItem";
import { Dispatch, SetStateAction } from "react";

export interface IUseUploads {
  uploads: UploadItem[];
  setUploads: Dispatch<SetStateAction<UploadItem[]>>;
  handleFiles: (files: FileList | null) => Promise<void>;
}
