import { Expose } from 'class-transformer'
import { IsString, IsNumber, IsEnum, IsNotEmpty } from 'class-validator'
import { Category } from 'src/common/enums-type.enum'

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @Expose()
    readonly codeProduct: string

    @IsString()
    @IsNotEmpty()
    @Expose()
    readonly product: string

    @IsString()
    @IsNotEmpty()
    @Expose()
    readonly description: string

    @IsNumber()
    @IsNotEmpty()
    @Expose()
    readonly price: number

    @IsEnum(Category)
    @IsNotEmpty()
    @Expose()
    readonly category: Category

    @IsNumber()
    @IsNotEmpty()
    @Expose()
    readonly stock: number

    @IsString()
    @Expose()
    readonly images: string

}
