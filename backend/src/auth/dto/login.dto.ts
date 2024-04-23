import { Expose } from "class-transformer"
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class LoginDto{
    @IsEmail()
    @IsNotEmpty()
    @Expose()
    @MaxLength(45)
    readonly email: string

    @IsString()
    @IsNotEmpty()
    @Expose()
    @MaxLength(60)
    @MinLength(6)
    readonly password: string
}