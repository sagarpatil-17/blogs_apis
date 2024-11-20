import { Body, Controller, Get, Param, Patch, Post, Req, SetMetadata, UseGuards } from "@nestjs/common";
import { BlogsService } from "./blogs.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateBlogDto } from "./dto/createBlog.dto";
import { AUTH } from "src/guards/auth.decorator";
import { Role } from "src/globals/role.enum";

@ApiTags('BlogsController')
@Controller('blog')
export class BlogsController {

    constructor(private readonly blogService: BlogsService) { }

    @Get()
    async getBlogs() {
        return await this.blogService.getBlogs();
    }

    @Get(':tag')
    async getBlogsByTags(@Param('tag') tag: string) {
        return await this.blogService.getBlogsByTags(tag);
    }

    @Get('detail/:blog_id')
    async getBlogDetail(@Param('blog_id') blog_id: string) {
        return await this.blogService.getBlogDetail(blog_id);
    }

    @AUTH(Role.Admin, Role.User)
    @Post('create')
    async createBlogs(@Body() dto: CreateBlogDto, @Req() req: any) {
        return await this.blogService.createBlogs(dto, req.user);
    }

    @Get('search/:searchedText')
    async searchBlogs(@Param('searchedText') searchedText: string) {
        return await this.blogService.searchBlogs(searchedText);
    }

}
