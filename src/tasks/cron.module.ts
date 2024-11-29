import { Module } from "@nestjs/common";
import { CronService } from "./cron.service";
import { PrismaService } from "src/prisma-service/prisma.service";

@Module({
    providers: [CronService, PrismaService]
})

export class CronModule { }