import { s3 } from "@/api/lib/s3Client";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";
import { IUrlItem } from "@/../shared/types/uploadUrl";

export async function POST(req: NextRequest) {
  const { filename, type } = await req.json();

  const key = `uploads/${crypto.randomUUID()}-${filename}`;

  const putCommand = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    ContentType: type,
  });
  const uploadUrl = await getSignedUrl(s3, putCommand, { expiresIn: 60 });

  const getCommand = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
  });
  const publicUrl = await getSignedUrl(s3, getCommand, { expiresIn: 60 * 15 });

  return NextResponse.json<IUrlItem>({
    uploadUrl,
    publicUrl,
    key,
  });
}
