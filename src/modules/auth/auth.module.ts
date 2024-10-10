import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaService } from "src/prisma-service/prisma.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "src/guards/jwt.strategy";

@Module({
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
            global: true,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.getOrThrow('JWT_SECRET_KEY'),

                signOptions: { expiresIn: '1hr' }
            })
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, PrismaService, JwtStrategy],
})

export class AuthModule { }