import { ConfigService } from '@nestjs/config';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { format } from 'date-fns';

const CLOUDINARY = 'Cloudinary';
const configService = new ConfigService();

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name: configService.get('CLOUD_NAME'),
      api_key: configService.get('CLOUDINARY_API_KEY'),
      api_secret: configService.get('CLOUDINARY_API_SECRET'),
    });
  },
};

export class CloudinaryService {
    async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
        const split = file.originalname.split('.');
        const extention = split.pop();
        const s3Key = format(new Date(), 'yyy-MM-dd-hh-mm-ss');
        const fileName = `file${s3Key}.${extention}`;
        return new Promise((resolve, reject) => {
          const upload = v2.uploader.upload_stream(
            {
              folder: 'Property',
              public_id: fileName
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            },
          );
          console.log(upload)
          toStream(file.buffer).pipe(upload);
        });
      }
}
