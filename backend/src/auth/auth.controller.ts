import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IUser } from 'src/user/interface/user.interface';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() userLogin: LoginDto): Promise<IUser> {
        return this.authService.login(userLogin)
    }
}
