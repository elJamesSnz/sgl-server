import dotenv from "dotenv";
import aws from "aws-sdk";

dotenv.config();

const region = "us-east-2";
const bucketname = "upload-images-sgl";
const accesKeyId = process.env.accesKeyId;
const secretAccesKey = process.env.secretAccesKey;

const s3 = new aws.s3({
  region,
  accesKeyId,
  secretAccesKey,
  signatureVersion: "v4",
});

export async function generateUploadUrl() {
  const imageName = "Image name";

  const params = {
    Bucket: bucketname,
    Key: imageName,
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
}
