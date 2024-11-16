import { Module } from "@nestjs/common";
import { BlogsController } from "./blogs.controller";
import { BlogsService } from "./blogs.service";
import { AuthModule } from "../auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { PrismaService } from "src/prisma-service/prisma.service";

@Module({
    imports: [],
    controllers: [BlogsController],
    providers: [BlogsService, PrismaService]
})

export class BlogsModule { }