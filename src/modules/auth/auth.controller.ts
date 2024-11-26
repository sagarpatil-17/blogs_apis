import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { ForgotPasswordDto, LoginDto, ResetPasswordDto, SignUpDto } from "./dto/auth.dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('/signUp')
    async signUp(@Body() signUpDto: SignUpDto) {
        return await this.authService.signUp(signUpDto);
    }

    @Post('/login')
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto);
    }

    @Post('verify-email')
    async verifyEmail(@Body() dto: ForgotPasswordDto) {
        return await this.authService.verifyEmail(dto);
    }

    @Post('verify-password')
    async verifyPassword(@Body() dto: ForgotPasswordDto) {
        return await this.authService.verifyPassword(dto);
    }

    @Post('reset-password')
    async resetPassword(@Body() dto: ResetPasswordDto) {
        return await this.authService.resetPassword(dto);
    }

}