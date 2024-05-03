import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Category } from 'src/helpers/enums-type.enum';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsString()
    @IsNotEmpty()
    @Expose()
    readonly codeProduct?: string

    @IsString()
    @IsNotEmpty()
    @Expose()
    readonly product?: string

    @IsString()
    @IsNotEmpty()
    @Expose()
    readonly description?: string

    @IsNumber()
    @IsNotEmpty()
    @Expose()
    readonly price?: number

    @IsEnum(Category)
    @IsNotEmpty()
    @Expose()
    readonly category?: Category

    @IsNumber()
    @IsNotEmpty()
    @Expose()
    amount?: number

    @IsString()
    @Expose()
    readonly images?: string
}
