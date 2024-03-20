import { PartialType } from '@nestjs/mapped-types';
import { CreateInvoiceDto } from './create-invoice.dto';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { Expose } from 'class-transformer';

export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) {
    @IsDate()
    readonly invoiceDate: Date

    @IsNumber()
    @Expose()
    @IsNotEmpty()
    readonly total_without_iva: number

    readonly total_with_iva: number
}
