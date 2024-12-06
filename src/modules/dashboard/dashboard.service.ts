import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma-service/prisma.service";

@Injectable()
export class DashboardService {

    constructor(private readonly prisma: PrismaService) { }

    async getDashboardDetails() {
        const [web, frontend, backend, fullstack] = await this.prisma.$transaction([
            this.prisma.blogDetails.count({
                where: { tags: { has: 'web' } }
            }),
            this.prisma.blogDetails.count({
                where: { tags: { has: 'frontend' } }
            }),
            this.prisma.blogDetails.count({
                where: { tags: { has: 'backend' } }
            }),
            this.prisma.blogDetails.count({
                where: { tags: { has: 'fullstack' } }
            })
        ]);

        return [
            { type: 'web', count: web },
            { type: 'frontend', count: frontend },
            { type: 'backend', count: backend },
            { type: 'fullstack', count: fullstack },
        ]
    }

}