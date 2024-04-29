import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants/auth.constants';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) { }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token)
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: `No estas autorizado para ingresar a esta ruta`
      },
        HttpStatus.UNAUTHORIZED
      )
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      });
      request['user'] = payload
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }
}

/* El siguiente método es la parte central del guardia de
autenticación. AuthGuard implementa la interfaz CanActivate de NestJS.
Esta función es llamada automáticamente por NestJS antes de permitir el acceso a una ruta protegida. */

