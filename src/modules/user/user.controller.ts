import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";

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

    @Get('blogs/:userId')
    async getMyBlogs(@Param('userId') userId: string) {
        return await this.userService.getMyBlogs(userId);
    }

}