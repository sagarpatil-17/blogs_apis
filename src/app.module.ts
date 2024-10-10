import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { BlogsModule } from './modules/blogs/blogs.module';

@Module({
  imports: [AuthModule, BlogsModule],
  providers: [],
})
export class AppModule { }
