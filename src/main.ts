import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as express from 'express';
import { join } from 'path';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    // Usar el middleware estático de Express
    app.use('/img', express.static(join(__dirname, '..', 'uploads')));

   // Habilitar CORS para todos los orígenes
   app.enableCors();
   app.useGlobalPipes(new ValidationPipe());

   const config = new DocumentBuilder()
   .setTitle('Radid-Food API')
   .setDescription('En este backend se pone a disposicion la API para manejar la configuracion de la App rapid-food. Proximamente tambien manejará los productos que se comercializaran')
   .setVersion('1.0')
   .addTag('config')
   .addTag('products')
   .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);



  await app.listen(3000);
}
bootstrap();
