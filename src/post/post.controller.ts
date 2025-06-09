import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { PostEntity } from './post.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiOperation({
    summary: '게시글 작성',
    description: '새로운 게시글을 작성합니다.',
  })
  @ApiBody({
    description: '작성할 게시글 데이터',
    type: PostEntity,
    examples: {
      example1: {
        summary: '예시 요청',
        value: {
          title: '첫 번째 게시글',
          content: '이것은 게시글 내용입니다.',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: '게시글이 성공적으로 작성됨',
    type: PostEntity,
  })
  create(@Body() postData: Partial<PostEntity>) {
    return this.postService.create(postData);
  }

  @Get()
  @ApiOperation({
    summary: '게시글 전체 조회',
    description: '모든 게시글을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '게시글 목록 조회 성공',
    type: [PostEntity],
  })
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: '게시글 상세 조회',
    description: '특정 ID를 가진 게시글을 조회합니다.',
  })
  @ApiParam({ name: 'id', type: Number, description: '게시글 ID' })
  @ApiResponse({
    status: 200,
    description: '게시글 조회 성공',
    type: PostEntity,
  })
  @ApiResponse({ status: 404, description: '게시글을 찾을 수 없음' })
  findOne(@Param('id') id: string) {
    return this.postService.findOne(Number(id));
  }

  @Delete(':id')
  @ApiOperation({
    summary: '게시글 삭제',
    description: '특정 게시글을 삭제합니다.',
  })
  @ApiParam({ name: 'id', type: Number, description: '삭제할 게시글 ID' })
  @ApiResponse({ status: 200, description: '게시글 삭제 성공' })
  @ApiResponse({ status: 404, description: '게시글을 찾을 수 없음' })
  delete(@Param('id') id: string) {
    return this.postService.delete(Number(id));
  }
}
