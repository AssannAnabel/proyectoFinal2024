import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsDate, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { Rol } from 'src/common/enums-type.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    @Expose()
    @IsNotEmpty()
    username?: string

    @IsString()
    @IsNotEmpty()
    @Expose()
    name?: string

    @IsString()
    @IsNotEmpty()
    @Expose()
    lastname?: string

    @IsEmail()
    @IsNotEmpty()
    @Expose()
    email?: string

    @IsString()
    @IsNotEmpty()
    @Expose()
    password?: string

    @IsNotEmpty()
    @IsEnum(Rol)
    @Expose()
    rol?: Rol

    @IsNotEmpty()
    @IsBoolean()
    @Expose()
    active?: boolean

    @IsString()
    @Expose()
    phone?: string

    @IsDateString()
    @Expose()
    birthDate?: Date

    @IsDateString()
    @Expose()
    createdAt?: Date
}
