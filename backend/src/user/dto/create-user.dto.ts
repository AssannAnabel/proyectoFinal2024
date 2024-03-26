import { IsString, IsEmail, IsEnum, IsBoolean, IsDate, IsNotEmpty, IsDateString } from "class-validator"
import { Expose } from "class-transformer"
import { Rol } from "src/common/enums-type.enum"


export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @Expose()
    readonly name: string

    @IsString()
    @IsNotEmpty()
    @Expose()
    readonly lastname: string

    @IsEmail()
    @IsNotEmpty()
    @Expose()
    readonly email: string

    @IsString()
    @IsNotEmpty()
    @Expose()
    readonly password: string

    readonly rol: Rol

    readonly active: boolean

    @IsString()
    @Expose()
    readonly phone: string

    @IsDateString()
    @Expose()
    readonly birthDate: Date

    readonly createdAt: Date
}
