import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  const config = new DocumentBuilder()
  .setTitle('Your API Name')          // Title of the API documentation
  .setDescription('API description')  // Description of your API
  .setVersion('1.0')                  // API version
  .addBearerAuth()                    // To support JWT bearer token
  .build();

// Create Swagger document
const document = SwaggerModule.createDocument(app, config);

// Setup Swagger module
SwaggerModule.setup('api-docs', app, document);
  await app.listen(3000);
}
bootstrap();
