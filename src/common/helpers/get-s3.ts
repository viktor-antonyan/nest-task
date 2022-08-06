import { S3 } from 'aws-sdk';

export default function getS3() {
  if (process.env.ENVIRONMENT && process.env.ENVIRONMENT === 'AWS') {
    // In AWS environment you shouldn't pass the followed keys.
    // TODO: Handle with this.
    return new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID_,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_,
    });
  } else {
    return new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }
}
