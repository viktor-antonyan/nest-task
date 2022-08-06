import { Module } from "@nestjs/common";
import { FilesUploadModule } from "./files-upload/files-upload.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot(),
    FilesUploadModule],
  controllers: [],
  providers: []
})
export class AppModule {
}
