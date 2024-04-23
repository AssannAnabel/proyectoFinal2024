import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ProductModule } from './product/product.module';
import { InvoiceModule } from './invoice/invoice.module';
import { InvoicesDetailsModule } from './invoices_details/invoices_details.module';
import { AuthModule } from './auth/auth.module';

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
  }), UserModule, ProductModule, InvoiceModule, InvoicesDetailsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
