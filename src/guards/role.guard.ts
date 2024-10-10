import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";


@Injectable()
export class RoleGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (user.role == 2) {
            return true;
        } else {
            throw new ForbiddenException('You dont have access')
        }

        return false;
    }

}