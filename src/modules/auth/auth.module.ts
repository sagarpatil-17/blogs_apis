import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaService } from "src/prisma-service/prisma.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'defaultSecretKey',
            signOptions: { expiresIn: '1hr' }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, PrismaService],
})

export class AuthModule { }