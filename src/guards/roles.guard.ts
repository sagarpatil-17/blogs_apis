import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<number[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // No roles are required for this route
    }

    const { user } = context.switchToHttp().getRequest();

    // Check if user roles include at least one required role
    if (!user?.role) {
      return false; // User has no role
    }

    return requiredRoles.includes(user.role);
  }
}
