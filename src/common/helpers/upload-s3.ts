import { Logger } from '@nestjs/common';
import getS3 from "./get-s3";

export async function uploadS3(
  file: Buffer | string,
  bucket: string,
  name: string,
) {
  const s3 = getS3();
  const params = {
    Bucket: bucket,
    Key: `${name}`,
    Body: file,
  };
  return s3
    .upload(params)
    .promise()
    .then((data) => {})
    .catch((err) => {
      Logger.error(err);
      throw err;
    });
}
