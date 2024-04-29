import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
=======
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ProductModule } from './product/product.module';
import { InvoiceModule } from './invoice/invoice.module';
import { InvoicesDetailsModule } from './invoices_details/invoices_details.module';
import { AuthModule } from './auth/auth.module';
import { DATABASE_NAME, DB_TYPE, HOST, PORT, USER_DB_NAME, USER_DB_PASSWORD } from 'config';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: DB_TYPE,
    host: HOST,
    port: PORT,
    username: USER_DB_NAME,
    password: USER_DB_PASSWORD,
    database: DATABASE_NAME,
    entities: [
      join(__dirname, '/**/*.entity{.js,.ts}')
    ],
    synchronize: true
  }), UserModule, ProductModule, InvoiceModule, InvoicesDetailsModule, AuthModule],
  controllers: [],
  providers: [],
>>>>>>> e5ff8a96075909651e937d710a7771842c2619b3
})
export class AppModule {}
