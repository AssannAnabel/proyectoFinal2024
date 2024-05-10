import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { IAccess_token } from './interface/auth.interface';
import { ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @ApiUnauthorizedResponse({ description: 'incorrect email or password' })
    @Post('login')
    async login(@Body() userLogin: LoginDto): Promise<IAccess_token> {
        return this.authService.login(userLogin)
    }
}
