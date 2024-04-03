import { Module } from '@nestjs/common';
import { InvoicesDetailsService } from './invoices_details.service';
import { InvoicesDetailsController } from './invoices_details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoicesDetail } from './entities/invoices_detail.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvoicesDetail, Invoice])],
  controllers: [InvoicesDetailsController],
  providers: [InvoicesDetailsService],
  exports: [InvoicesDetailsService]
})
export class InvoicesDetailsModule { }
