import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { PostEntity } from './post.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiOperation({ summary: '게시글 작성' })
  @ApiResponse({ status: 201, description: '게시글이 성공적으로 작성됨' })
  create(@Body() postData: Partial<PostEntity>) {
    return this.postService.create(postData);
  }

  @Get()
  @ApiOperation({ summary: '게시글 전체 조회' })
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '게시글 상세 조회' })
  findOne(@Param('id') id: string) {
    return this.postService.findOne(Number(id));
  }

  @Delete(':id')
  @ApiOperation({ summary: '게시글 삭제' })
  delete(@Param('id') id: string) {
    return this.postService.delete(Number(id));
  }
}
