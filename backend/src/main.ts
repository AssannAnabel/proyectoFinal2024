import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,//permite realizar una limpieza de todas las propiedades que no están definidas en el DTO, 
    //para que el objeto enviado al controlador como body solo tenga las propiedades que se han definido en el DTO.
    forbidNonWhitelisted: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('AgroTech')
    .setDescription('Documentacion de la API de Agrotech - Propietarios: Anabel Assan - Fabricio Cordoba - Emiliano Salazar')
    .setVersion('1.0')
    .addTag('Resources')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('agrotech-api', app, document)

  await app.listen(3000);

  const appFrontend1 = await NestFactory.create(AppModule);
  await appFrontend1.listen(5173); // Escuchar en el puerto 5173

  // Crear una tercera instancia de la aplicación NestJS para el puerto 5174 (frontend)
  const appFrontend2 = await NestFactory.create(AppModule);
  await appFrontend2.listen(5174); // Escuchar en el puerto 5174
}
bootstrap();
