import { Module } from "@nestjs/common";
import { CloudinaryProvider, CloudinaryService } from "./cloudinary";


@Module({
    providers: [CloudinaryProvider, CloudinaryService],
    exports: [CloudinaryProvider, CloudinaryService],
})

export class CloudinaryModule {}