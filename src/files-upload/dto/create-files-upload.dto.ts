import { IsOptional, IsString } from "class-validator";

export class CreateFilesUploadDto {
  @IsString()
  file: string;

  @IsString()
  @IsOptional()
  size?: string;
}
