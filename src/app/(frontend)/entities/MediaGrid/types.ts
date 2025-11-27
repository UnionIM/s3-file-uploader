import { UploadItem } from "@/(frontend)/shared/types/UploadItem";

export interface MediaGridProps {
  uploads: UploadItem[];
  onDelete: (item: UploadItem) => void;
}
