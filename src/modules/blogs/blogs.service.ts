import { Injectable } from "@nestjs/common";

@Injectable()
export class BlogsService {

    getBlogs() {
        return 'blogs works!'
    }
}