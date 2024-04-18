import { PartialType } from '@nestjs/mapped-types';
import { CreateInvoicesDetailDto } from './create-invoices_detail.dto';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateInvoicesDetailDto extends PartialType(CreateInvoicesDetailDto) {
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    readonly amount_sold?: number

    readonly id_invoices?: number
}
