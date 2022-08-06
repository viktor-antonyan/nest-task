import getS3 from './../../common/helpers/get-s3';
import { Logger } from '@nestjs/common';

export async function deleteS3(bucket: string, name: string): Promise<any> {
  if (!name) return;

  const s3 = getS3();
  const params = {
    Bucket: bucket,
    Key: String(name),
  };
  return new Promise((resolve, reject) => {
    s3.deleteObject(params, (err, data) => {
      if (err) {
        Logger.error(err);
        reject(err.message);
      }
      resolve(data);
    });
  });
}
