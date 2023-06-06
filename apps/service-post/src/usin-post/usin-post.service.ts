import { Injectable } from '@nestjs/common';
import { FindAllViewUsinPostDto } from './dto/find-all.view-usin-post.dto';
import { FindOneViewUsinPostDto } from './dto/find-one.view-usin-post.dto';
import { UsinPostServiceException } from './exception/usin-post.service-exception';
import { ViewUsinPostRepository } from './repository/view.usin-post.repository';

@Injectable()
export class UsinPostService {
  constructor(
    // repository
    private readonly viewUsinServicePostRepository: ViewUsinPostRepository,
  ) {}
  /**
   * 포스트 목록 조회
   * @param dto
   */
  async findAllUsin(dto: FindAllViewUsinPostDto) {
    try {
      const [datas, count] = await this.viewUsinServicePostRepository.findAll(
        dto,
      );

      return [datas, count];
    } catch (error) {
      UsinPostServiceException.findAll(error);
    }
  }

  /**
   * 포스트 상세 조회
   * @param dto
   */
  async findOneUsin(dto: FindOneViewUsinPostDto) {
    try {
      const data = await this.viewUsinServicePostRepository.findOneOrThrow(dto);

      return data;
    } catch (error) {
      UsinPostServiceException.findOne(error, dto.postId);
    }
  }
}
