import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DashboardService } from "./dashboard.service";
import { AUTH } from "src/guards/auth.decorator";
import { Role } from "src/globals/role.enum";

@ApiTags('DashboardController')
@Controller('dashboard')
export class DashboardController {

    constructor(private readonly dashboardService: DashboardService) { }

    @AUTH(Role.Admin)
    @Get()
    async getDashboardDetails() {
        return await this.dashboardService.getDashboardDetails();
    }

}