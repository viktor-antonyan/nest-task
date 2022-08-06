import { Controller, Post, Body, Delete, UseInterceptors, UploadedFiles } from "@nestjs/common";
import { FilesUploadService } from "./files-upload.service";
import { CreateFilesUploadDto } from "./dto/create-files-upload.dto";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { DeleteFileDto } from "./dto/delete-file.dto";

@Controller("files")
export class FilesUploadController {
  constructor(private readonly filesUploadService: FilesUploadService) {
  }

  @Post()
  @ApiBody({
    type: CreateFilesUploadDto,
    description: "file create body"
  })
  @ApiResponse({
    status: 201,
    description: "Create file.",
    schema: {
      properties: {
        file_url: { type: "string" }
      }
    }
  })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "file", maxCount: 1 }
    ])
  )
  create(@UploadedFiles() files: File[], @Body() body: CreateFilesUploadDto) {
    const { size } = body;
    return this.filesUploadService.create(files, size);
  }

  @Delete()
  @ApiBody({
    type: DeleteFileDto,
    description: "file delete body"
  })
  @ApiResponse({
    status: 200,
    description: "Delete file.",
    schema: {
      properties: {
        msg: { type: "string" }
      }
    }
  })
  remove(@Body() body: DeleteFileDto) {
    const { file_name } = body;
    return this.filesUploadService.remove(file_name);
  }
}
