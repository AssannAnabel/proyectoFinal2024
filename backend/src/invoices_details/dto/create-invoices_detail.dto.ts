import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateInvoicesDetailDto {
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    readonly amount_sold: number

    readonly id_product: number

    readonly id_invoices: number
}
