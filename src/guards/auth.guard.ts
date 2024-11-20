import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly JWT_SECRET_KEY: string;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.JWT_SECRET_KEY = this.configService.getOrThrow('JWT_SECRET_KEY');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token found');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.JWT_SECRET_KEY,
      });
      request['user'] = payload;  // Attach user data to request
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
