import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { BlogsModule } from './modules/blogs/blogs.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, BlogsModule, UserModule, ConfigModule.forRoot({ isGlobal: true })],
  providers: [],
})
export class AppModule { }
