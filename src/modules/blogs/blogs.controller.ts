import { Controller, Get, SetMetadata, UseGuards } from "@nestjs/common";
import { BlogsService } from "./blogs.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { RoleGuard } from "src/guards/role.guard";

@Controller('blogs')
@ApiTags('Blogs controller')
export class BlogsController {

    constructor(private readonly blogService: BlogsService) { }

    @UseGuards(JwtAuthGuard,RoleGuard)
    @ApiBearerAuth('access-token')
    @Get()
    async getBlogs() {
        return this.blogService.getBlogs();
    }


}
