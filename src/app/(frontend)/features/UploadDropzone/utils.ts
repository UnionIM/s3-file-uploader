import axios from "axios";
import { IUrlItem } from "@/../shared/types/uploadUrl";

export async function getPresignedUrl(file: File): Promise<IUrlItem> {
  const { data } = await axios.post("/api/upload-url", {
    filename: file.name,
    type: file.type,
  });

  return {
    uploadUrl: data.uploadUrl,
    publicUrl: data.publicUrl,
    key: data.key,
  };
}
