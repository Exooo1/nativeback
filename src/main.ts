import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exception/HttpExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: '*', // запросы к бэку могу делать с любого источника, на практике лучше указать только свой web сайт.
    credentials: true, // нужен для того чтобы браузер отправлял заголовки, cookie, если указать false, то никакие заголовки приходить не будут
    // methods: ['GET', '...and others'], Этот параметр определяет методы HTTP, которые разрешены для доступа к ресурсам на сервере из кросс-доменных источников.
    // allowedHeaders: ['Content-type'], Этот параметр определяет список заголовков HTTP, которые разрешены в кросс-доменных запросах
    // exposedHeaders:[] Этот параметр определяет список заголовков HTTP, которые могут быть доступны клиенту из кросс-доменных ответов
    // maxAge,
    // preflightContinue,
    // optionsSuccessStatus,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  const port = configService.get('PORT');
  await app.listen(port, configService.get('HOST_NAME'));
}

bootstrap();
