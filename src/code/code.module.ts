import { Module } from '@nestjs/common';
import { CodeService } from './code.service';
import { CodeController } from './code.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Code, CodeSchema } from './entities/code.entity';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { NotificationService } from 'src/services/NotificationService';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Code.name, schema: CodeSchema },
      { name: User.name, schema: UserSchema },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./env/.env.${process.env.NODE_ENV}`
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN}
    })
  ],
  controllers: [CodeController],
  providers: [CodeService, NotificationService]
})
export class CodeModule {}
