import { IUrlItem } from "@/../shared/types/uploadUrl";

export interface IUploadDropzone {
  getPresignedUrl: (file: File) => Promise<IUrlItem>;
}
