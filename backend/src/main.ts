import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true,//permite realizar una limpieza de todas las propiedades que no están definidas en el DTO, 
    //para que el objeto enviado al controlador como body solo tenga las propiedades que se han definido en el DTO.
    forbidNonWhitelisted: true,
  }));
  await app.listen(3001);
}
bootstrap();
