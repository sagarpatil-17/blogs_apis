import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail, IsOptional } from "class-validator";

export class UserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    username: string;

    @ApiProperty()
    @IsEmail({}, { message: 'Email must be a valid email address' })
    @IsNotEmpty()
    @IsOptional()
    email: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    password: string;
}

export class SubscribeDto {
    @ApiProperty()
    @IsEmail({}, { message: 'Email must be a valid email address' })
    @IsNotEmpty()
    @IsOptional()
    email: string;
}