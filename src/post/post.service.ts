import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  create(data: Partial<PostEntity>) {
    const post = this.postRepository.create(data);
    return this.postRepository.save(post);
  }

  findAll() {
    return this.postRepository.find({ order: { createdAt: 'DESC' } });
  }

  findOne(id: number) {
    return this.postRepository.findOneBy({ id });
  }

  delete(id: number) {
    return this.postRepository.delete(id);
  }
}
