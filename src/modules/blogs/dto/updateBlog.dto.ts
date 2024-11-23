import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString } from "class-validator";

export class UpdateBlogDto {

    @ApiProperty()
    @IsString()
    @IsOptional()
    title: string;

    @ApiProperty()
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    tags: string[];

    @ApiProperty()
    @IsString()
    @IsOptional()
    details: string;

    // @IsString()
    // createdBy: string;
}