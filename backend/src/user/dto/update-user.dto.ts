import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsDate, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { Rol } from 'src/helpers/enums-type.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    idUser:number
    @IsString()
    @IsNotEmpty()
    @Expose()
    readonly name?: string

    @IsString()
    @IsNotEmpty()
    @Expose()
    readonly lastname?: string

    @IsEmail()
    @IsNotEmpty()
    @Expose()
    readonly email?: string

    @IsString()
    @IsNotEmpty()
    @Expose()
    password?: string

    @IsNotEmpty()
    @IsEnum(Rol)
    @Expose()
    readonly rol?: Rol

    @IsNotEmpty()
    @IsBoolean()
    active?: boolean

    @IsString()
    @Expose()
    readonly phone?: string

    @IsDateString()
    @Expose()
    readonly birthDate?: Date

    readonly createdAt?: Date
}
