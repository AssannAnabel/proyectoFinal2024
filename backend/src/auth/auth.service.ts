import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IAccess_token } from './interface/auth.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    private async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
        const match = await bcrypt.compare(plainPassword, hashedPassword);
        return match;
    }

    async login(userAuth: LoginDto): Promise<IAccess_token> {
        const userFound = await this.userService.findUserByEmail(userAuth.email)


        if (userFound && await this.comparePasswords(userAuth.password, userFound.password) && userFound.active === true) {
            const payload = { sub: userFound.idUser, name: userFound.name, email: userFound.email };
            return {
                access_token: await this.jwtService.signAsync(payload),
                email: userFound.email,
                name: userFound.name,
                rol: userFound.rol,
                id: userFound.idUser
            }
        }

        if (userFound.password !== userAuth.password || userFound.active === false) {
            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED, error: `Contraseña o email incorrecto`
            }, HttpStatus.UNAUTHORIZED)
        }
    }
}