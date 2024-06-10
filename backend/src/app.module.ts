import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ProductModule } from './product/product.module';
import { InvoiceModule } from './invoice/invoice.module';
import { InvoicesDetailsModule } from './invoices_details/invoices_details.module';
import { AuthModule } from './auth/auth.module';
import { DATABASE_NAME, DB_TYPE, HOST, PORT, USER_DB_NAME, USER_DB_PASSWORD } from 'config';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import  multerOptions  from './multer/multer.config';
import { CloudinaryProvider } from './cloudinary/cloudinary.config';

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
  }),
    UserModule,
    ProductModule,
    InvoiceModule,
    InvoicesDetailsModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MulterModule.register(multerOptions)
  ],
  controllers: [],
  providers: [CloudinaryProvider],
})
export class AppModule { }
