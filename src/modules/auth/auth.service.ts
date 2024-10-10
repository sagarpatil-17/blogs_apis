import { Body, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma-service/prisma.service";
import { LoginDto, SignUpDto } from "./dto/auth.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) { }

    async signUp(signUpDto: SignUpDto) {
        try {
            const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

            return this.prisma.users.create({
                data: {
                    username: signUpDto.username,
                    email: signUpDto.email,
                    password: hashedPassword,
                    user_id: '1',
                    role: '2'
                }
            })
        } catch (error) {
            throw new InternalServerErrorException('Failed to signup')
        }
    }

    async login(@Body() loginDto: LoginDto) {
        const user = await this.prisma.users.findUnique({
            where: { email: loginDto.email },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid Credentials!');
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid Credentials!');
        }

        // Generate JWT payload
        const payload = { email: user.email, sub: user.user_id, role: user.role };
        return { auth_token: this.jwtService.sign(payload) };
    }

}