import { IsString, IsEmail, IsEnum, IsBoolean, IsDate, IsNotEmpty, IsDateString, MaxLength, MinLength } from "class-validator"
import { Expose } from "class-transformer"
import { Rol } from "src/common/enums-type.enum"


export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @Expose()
    @MaxLength(45)
    readonly name: string

    @IsString()
    @IsNotEmpty()
    @Expose()
    @MaxLength(45)
    readonly lastname: string

    @IsEmail()
    @IsNotEmpty()
    @Expose()
    @MaxLength(45)
    readonly email: string

    @IsString()
    @IsNotEmpty()
    @Expose()
    @MaxLength(45)
    @MinLength(6)
    readonly password: string

    @IsEnum(Rol)
    readonly rol: Rol

    @IsBoolean()
    readonly active: boolean

    @IsString()
    @Expose()
    @MaxLength(15)
    readonly phone: string

    @IsDateString()
    @Expose()
    readonly birthDate: Date

    readonly createdAt: Date
}
