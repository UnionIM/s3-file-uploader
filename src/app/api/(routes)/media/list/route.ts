import { s3 } from "@/api/lib/s3Client";
import { ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";
import { IMediaItem } from "@/../shared/types/listMedia";

export async function GET() {
  const data = await s3.send(
    new ListObjectsV2Command({
      Bucket: process.env.S3_BUCKET_NAME,
      Prefix: "uploads/",
    })
  );

  const files = await Promise.all(
    (data.Contents ?? []).map(async (obj) => {
      if (obj.Key === "uploads/") return null;

      const url = await getSignedUrl(
        s3,
        new GetObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: obj.Key!,
        }),
        { expiresIn: 60 * 5 }
      );

      return {
        key: obj.Key!,
        url,
      };
    })
  );

  return NextResponse.json<IMediaItem[]>(files.filter((file) => file !== null));
}
