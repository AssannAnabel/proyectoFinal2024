import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) { }

    private async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
        const match = await bcrypt.compare(plainPassword, hashedPassword);
        return match;
    }

    async login(userAuth: LoginDto): Promise<CreateUserDto> {
        const userFound = await this.userService.findUserByEmail(userAuth.email)
        if (userFound && await this.comparePasswords(userAuth.password, userFound.password)) {
            return userFound;
        }
        if (userFound.password !== userAuth.password || userFound.active === false) {
            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED, error: `Contraseña o email incorrecto`
            }, HttpStatus.UNAUTHORIZED)
        }
        return userFound
    }


}
