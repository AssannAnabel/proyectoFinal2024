import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { InvoicesDetail } from 'src/invoices_details/entities/invoices_detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, InvoicesDetail])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule { }
