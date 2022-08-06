import { BadRequestException, Injectable } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { uploadS3 } from "../common/helpers/upload-s3";
import * as FILE_MESSAGES from "../common/messages/files.json";
import { deleteS3 } from "../common/helpers/delete-s3";
import * as sharp from "sharp";
import { isFileImage } from "../common/helpers/is-file-image";
import { MIME_TYPES, VALID_SIZES } from "../common/constants/index";

@Injectable()
export class FilesUploadService {

  async create(files, size): Promise<{ file_url: string }> {
    try {
      const file_id = uuid();
      if (files?.file) {
        let { originalname, mimetype, buffer } = files.file[0];
        if (isFileImage(files.file[0]) && !MIME_TYPES[mimetype]) {
          throw new BadRequestException(FILE_MESSAGES.INVALID_IMAGE_TYPE);
        }

        if (isFileImage(files.file[0]) && size && VALID_SIZES.includes(size)) {
          const [width, height] = size.split("x");
          buffer = await this.resize(files.file[0].buffer, +width, +height);
        } else if (isFileImage(files.file[0]) && size && !VALID_SIZES.includes(size)) {
          throw new BadRequestException(FILE_MESSAGES.INVALID_IMAGE_SIZE);
        }

        const imageData: string = `${file_id}_${originalname}`;
        await uploadS3(buffer, process.env.AWS_S3_BUCKET, imageData);
        return { file_url: `${process.env.AWS_S3_URL}${imageData}` };
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async resize(buffer, width: number, height: number) {
    return sharp(buffer).resize(width, height).toBuffer();
  }

  async remove(file_name: string): Promise<{ msg: string }> {
    try {
      await deleteS3(process.env.AWS_S3_BUCKET, file_name);
      return {
        msg: FILE_MESSAGES.DELETE_FILE
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
