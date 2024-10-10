import { Module } from "@nestjs/common";
import { BlogsController } from "./blogs.controller";
import { BlogsService } from "./blogs.service";
import { AuthModule } from "../auth/auth.module";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [],
    controllers: [BlogsController],
    providers: [BlogsService]
})

export class BlogsModule { }