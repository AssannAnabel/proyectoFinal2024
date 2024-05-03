import { Expose } from 'class-transformer'
import { IsString, IsNumber, IsEnum, IsNotEmpty, MaxLength, MinLength, Length } from 'class-validator'
import { Category } from 'src/helpers/enums-type.enum'

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @Expose()
    @Length(8)
    readonly codeProduct: string

    @IsString()
    @IsNotEmpty()
    @Expose()
    @MaxLength(45)
    readonly product: string

    @IsString()
    @IsNotEmpty()
    @Expose()
    @MaxLength(255)
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
    amount: number

    @IsString()
    @Expose()
    @MaxLength(255)
    readonly images: string

}
