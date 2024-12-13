import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('TestController')
@Controller('test')
export class TestController {

    @Get('server')
    async testServer() {
        return await { message: 'Server is stared!' }
    }

}