import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const httpsOptions = {};
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: [
      "http://localhost:5173",
      "https://propertyprospecthq.netlify.app"
    ],
    methods: ['POST', 'PUT', 'DELETE', 'GET', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  app.enableVersioning({
    type: VersioningType.URI
  })
  console.log()
  await app.listen(3000);
}
bootstrap();
