import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create.post.dto';
import { EditPostDto } from './dto/edit.post.dto';
import { FindAllViewAdminPostDto } from './dto/find-all.view-admin-post.dto';
import { FindOneViewAdminPostDto } from './dto/find-one.view-admin-post.dto';
import { RemovePostDto } from './dto/remove.post.dto';
import { AdminPostServiceException } from './excepton/admin-post.service-exception';
import { AdminPostRepository } from './repository/admin-post.repository';
import { ViewAdminPostRepository } from './repository/view.admin-post.repository';
import { EditPostValidator } from './validator/edit.post.validator';
import { RemovePostValidator } from './validator/remove.post.validator';

@Injectable()
export class AdminPostService {
  constructor(
    // repository
    private readonly adminPostRepository: AdminPostRepository,
    private readonly viewAdminServicePostRepository: ViewAdminPostRepository,

    // validator
    private readonly editPostValidator: EditPostValidator,
    private readonly removePostValidator: RemovePostValidator,
  ) {}

  /**
   * 포스트 목록 조회
   * @param dto
   * @returns
   */
  async findAll(dto: FindAllViewAdminPostDto) {
    try {
      const [datas, count] = await this.viewAdminServicePostRepository.findAll(
        dto,
      );

      return [datas, count];
    } catch (error) {
      AdminPostServiceException.findAll(error);
    }
  }

  /**
   * 포스트 상세 조회
   * @param dto
   */
  async findOne(dto: FindOneViewAdminPostDto) {
    try {
      const data = await this.viewAdminServicePostRepository.findOneOrThrow(
        dto,
      );

      return data;
    } catch (error) {
      AdminPostServiceException.findOne(error, dto.postId);
    }
  }

  /**
   * 포스트 등록
   * @param dto
   * @returns
   */
  async create(dto: CreatePostDto) {
    try {
      const entity = await dto.build();

      const data = await this.adminPostRepository.create(entity);

      return data;
    } catch (error) {
      AdminPostServiceException.create(error);
    }
  }

  /**
   * 포스트 수정
   * @param dto
   */
  async edit(dto: EditPostDto) {
    try {
      await dto.validate(this.editPostValidator);

      const entity = await dto.build();

      const data = await this.adminPostRepository.edit(entity, dto.id);

      return data;
    } catch (error) {
      AdminPostServiceException.edit(error, dto.id);
    }
  }

  /**
   * 포스트 삭제
   * @param dto
   */
  async remove(dto: RemovePostDto) {
    try {
      await dto.validate(this.removePostValidator);

      const entity = await dto.build();

      const data = await this.adminPostRepository.remove(entity, dto.id);

      return data;
    } catch (error) {
      AdminPostServiceException.edit(error, dto.id);
    }
  }
}
