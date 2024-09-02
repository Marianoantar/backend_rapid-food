import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
  SwaggerModule.setup('documentation', app, document);


  await app.listen(3000);
}
bootstrap();
