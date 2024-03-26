import { IsNumber, IsNotEmpty } from 'class-validator'
import { Expose } from 'class-transformer'

export class CreateInvoiceDto {


    readonly invoiceDate: Date

    @Expose()
    @IsNumber()
    @IsNotEmpty()
    readonly total_without_iva: number
}
