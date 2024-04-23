import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUser } from 'src/user/interface/user.interface';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) { }

    async login(userAuth: LoginDto): Promise<IUser> {
        const userFound = await this.userService.findUserByEmail(userAuth.email)
        if (userFound.password !== userAuth.password || userFound.active === false) {
            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED, error: `Contraseña o email incorrecto`
            }, HttpStatus.UNAUTHORIZED)
        }
        const { password, ...rest } = userFound
        return rest
    }


}
