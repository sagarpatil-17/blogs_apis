import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma-service/prisma.service";
import { CreateBlogDto } from "./dto/createBlog.dto";

@Injectable()
export class BlogsService {

    private readonly images = [
        'img-1.png', 'img-2.jpg', 'img-3.png', 'img-4.jpg', 'img-5.jpg', 'img-6.jpg', 'img-7.jpg', 'img-8.jpg'
    ];
    private randomImg() {
        return this.images[Math.floor(Math.random() * this.images.length)];
    }

    constructor(private readonly prisma: PrismaService) { }

    async getBlogs() {
        const [featured_blogs, latest_blogs, frontend_blogs, backend_blogs, fullstack_blogs] = await this.prisma.$transaction([
            this.prisma.blogDetails.findMany({
                where: { tags: { has: 'featured' } },
                include: { author: true },
                take: 2,
                orderBy: { createdAt: 'desc' }
            }),
            this.prisma.blogDetails.findMany({
                include: { author: true },
                take: 3,
                orderBy: { createdAt: 'desc' }
            }),
            this.prisma.blogDetails.findMany({
                where: { tags: { has: 'frontend' } },
                include: { author: true },
                take: 3,
                orderBy: { createdAt: 'desc' }
            }),
            this.prisma.blogDetails.findMany({
                where: { tags: { has: 'backend' } },
                include: { author: true },
                take: 3,
                orderBy: { createdAt: 'desc' }
            }),
            this.prisma.blogDetails.findMany({
                where: { tags: { has: 'fullstack' } },
                include: { author: true },
                take: 3,
                orderBy: { createdAt: 'desc' }
            })
        ]);

        return {
            featured_blogs: featured_blogs.map(blog => { return { ...blog, image: this.randomImg() } }),
            latest_blogs: latest_blogs.map(blog => { return { ...blog, image: this.randomImg() } }),
            frontend_blogs: frontend_blogs.map(blog => { return { ...blog, image: this.randomImg() } }),
            backend_blogs: backend_blogs.map(blog => { return { ...blog, image: this.randomImg() } }),
            fullstack_blogs: fullstack_blogs.map(blog => { return { ...blog, image: this.randomImg() } }),
        }
    }

    async getBlogsByTags(tag: string) {
        let blogs = undefined;

        if (tag == 'latest') {
            blogs = await this.prisma.blogDetails.findMany({
                include: { author: true }
            });
        } else {
            blogs = await this.prisma.blogDetails.findMany({
                where: {
                    tags: { has: tag }
                },
                include: { author: true }
            });
        }

        return blogs.map(blog => {
            return { ...blog, image: this.randomImg() }
        })
    }

    async getBlogDetail(blog_id: string) {
        const blogDetail = await this.prisma.blogDetails.findUnique({
            where: { id: blog_id },
            include: { author: true }
        });

        if (!blogDetail) {
            throw new Error(`Blog with id ${blog_id} not found`)
        }

        return { ...blogDetail, image: this.randomImg() }
    }

    async createBlogs(dto: CreateBlogDto) {
        return await this.prisma.blogDetails.create({
            data: {
                ...dto,
                createdBy: 1
            }
        });
    }

    async searchBlogs(searchedText: string) {
        const blogs = await this.prisma.blogDetails.findMany({
            where: { title: { contains: searchedText, mode: 'insensitive' } },
            include: { author: true }
        })

        return blogs.map(blog => {
            return { ...blog, image: this.randomImg() }
        })
    }

}