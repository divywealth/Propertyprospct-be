import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CodeModule } from './code/code.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env/.env.${process.env.NODE_ENV}`,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    AuthenticationModule,
    UserModule,
    CodeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
