import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, User])],
  controllers: [InvoiceController],
  providers: [InvoiceService],
  exports: [InvoiceService]
})
export class InvoiceModule { }
