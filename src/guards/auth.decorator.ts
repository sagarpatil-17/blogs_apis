import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './roles.guard';
import { Reflector } from '@nestjs/core';

export function AUTH(...roles: number[]) {
  return applyDecorators(
    RequiredRoles(roles),
    UseGuards(AuthGuard, RoleGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export const RequiredRoles = Reflector.createDecorator<number[]>();