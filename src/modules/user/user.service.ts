import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma-service/prisma.service";
import { UserDto } from "./dto/user.dto";
import * as bcrypt from 'bcrypt';
import { ObjectId } from "mongodb";

@Injectable()
export class UserService {

    private readonly images = [
        'img-1.png', 'img-2.jpg', 'img-3.png', 'img-4.jpg', 'img-5.jpg', 'img-6.jpg', 'img-7.jpg', 'img-8.jpg'
    ];
    private randomImg() {
        return this.images[Math.floor(Math.random() * this.images.length)];
    }

    constructor(private readonly prisma: PrismaService) { }

    async getUserProfile(userId: string) {
        return await this.prisma.users.findUnique({
            where: { id: userId }
        });
    }

    async updateUserProfile(userId: string, dto: UserDto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        return await this.prisma.users.update({
            where: { id: userId },
            data: {
                username: dto.username,
                email: dto.email,
                password: hashedPassword
            }
        });
    }

    async getMyBlogs() {
        const blogs = await this.prisma.blogDetails.findMany({
            where: { createdBy: '66fda8708edd5a1be29d03f9' },
            include: { author: true },
        });

        return blogs.map(blog => {
            return { ...blog, image: this.randomImg() }
        });
    }

}