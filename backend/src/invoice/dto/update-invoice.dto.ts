import { PartialType } from '@nestjs/mapped-types';
import { CreateInvoiceDto } from './create-invoice.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Expose } from 'class-transformer';

export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) {
    readonly invoiceDate?: Date

    @Expose()
    @IsNumber()
    @IsNotEmpty()
    readonly total_without_iva?: number

    readonly id_user?:number
}
