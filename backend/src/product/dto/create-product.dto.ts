import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsString, IsNumber, IsEnum, IsNotEmpty, MaxLength, MinLength, Length, IsOptional, Matches } from 'class-validator'
import { Category } from 'src/helpers/enums-type.enum'

export class CreateProductDto {
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

    @IsOptional()
    @IsString()
    //@Matches(/\.(jpg|jpeg|png|gif)$/i, { message: 'Image must be a valid image format (jpg, jpeg, png, gif)' })
    images: string

}
