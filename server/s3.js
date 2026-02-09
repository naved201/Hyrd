import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function createPresignedUploadUrl(key) {
  const command = new PutObjectCommand({
    Bucket: "hyrd-resumes", 
    Key: key,
    ContentType: "application/pdf",
  });

  return getSignedUrl(s3, command, { expiresIn: 60 });
}
