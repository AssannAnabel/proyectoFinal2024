import { IsNumber, IsDate, IsNotEmpty } from 'class-validator'
import { Expose } from 'class-transformer'

export class CreateInvoiceDto {

   
    readonly invoiceDate: Date

    @IsNumber()
    @Expose()
    @IsNotEmpty()
    readonly total_without_iva: number

    readonly total_with_iva: number
}
