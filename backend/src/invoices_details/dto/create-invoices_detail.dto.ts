import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateInvoicesDetailDto {
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    readonly amount_sold: number

    @Expose()
    @IsNotEmpty()
    readonly id_product: number

    @Expose()
    @IsNotEmpty()
    readonly id_invoice: number
}
