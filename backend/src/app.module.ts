import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'agrotech',
    entities: [
      join(__dirname, '/**/*.entity{.js,.ts}')
    ],
    synchronize: true
  }), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
