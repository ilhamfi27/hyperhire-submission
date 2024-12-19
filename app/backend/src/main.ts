import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { API_PREFIX } from 'src/shared/constants/global.constants';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(API_PREFIX);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  const options = new DocumentBuilder()
    .setTitle('Nestjs')
    .setDescription('The nestjs API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api-docs', app, document);

  await app.listen(1321);
}
bootstrap();
