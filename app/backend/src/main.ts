import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { API_PREFIX } from 'src/shared/constants/global.constants';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.setGlobalPrefix(API_PREFIX);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  const options = new DocumentBuilder()
    .setTitle(configService.get('swagger.title'))
    .setDescription(configService.get('swagger.description'))
    .setVersion(configService.get('swagger.version'))
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api-docs', app, document);

  await app.listen(configService.get('nest.port'), () => {
    console.log(
      `Server is running on http://0.0.0.0:${configService.get('nest.port')}`,
    );
  });
}
bootstrap();
