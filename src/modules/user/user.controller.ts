import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { AUTH } from "src/guards/auth.decorator";
import { Role } from "src/globals/role.enum";

@ApiTags('UserController')
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get(':userId')
    async getUserProfile(@Param('userId') userId: string) {
        return await this.userService.getUserProfile(userId);
    }

    @Patch('update/:userId')
    async updateUserProfile(@Param('userId') userId: string, @Body() dto: UserDto) {
        return await this.userService.updateUserProfile(userId, dto);
    }

    @AUTH(Role.Admin)
    @Get('blogs/:userId')
    async getMyBlogs(@Param('userId') userId: number) {
        return await this.userService.getMyBlogs(+userId);
    }

}