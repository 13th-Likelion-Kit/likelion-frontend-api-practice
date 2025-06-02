import { Module } from '@nestjs/common';
import { PostEntity } from './post/post.entity';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [PostEntity],
      synchronize: true,
    }),
    PostModule,
  ],
})
export class AppModule {}
