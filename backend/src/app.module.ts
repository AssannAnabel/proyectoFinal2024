import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ProductModule } from './product/product.module';

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
  }), UserModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
