import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { BlogsModule } from './modules/blogs/blogs.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [AuthModule, BlogsModule, UserModule],
  providers: [],
})
export class AppModule { }
