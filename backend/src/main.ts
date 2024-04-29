import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
<<<<<<< HEAD
=======
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true,//permite realizar una limpieza de todas las propiedades que no están definidas en el DTO, 
    //para que el objeto enviado al controlador como body solo tenga las propiedades que se han definido en el DTO.
    forbidNonWhitelisted: true,
  }));
>>>>>>> e5ff8a96075909651e937d710a7771842c2619b3
  await app.listen(3000);
}
bootstrap();
