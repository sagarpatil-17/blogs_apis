import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token from Authorization header
      ignoreExpiration: false, // Reject expired tokens
      secretOrKey: '123456', // The secret used to sign the token
    });
  }

  async validate(payload: any) {
    // Here, we return the payload or any data you want to pass to the request
    // The payload contains the decoded token (like sub, email, role, etc.)
    return { user_id: payload.sub, email: payload.email, role: payload.role };
  }
}
