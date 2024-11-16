import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class CreateBlogDto {

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsArray()
    @IsString({ each: true })
    tags: string[];

    @ApiProperty()
    @IsString()
    details: string;

    // @IsString()
    // createdBy: string;
}