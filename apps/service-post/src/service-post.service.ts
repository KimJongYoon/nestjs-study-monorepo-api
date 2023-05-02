import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create.post.dto';
import { EditPostDto } from './dto/edit.post.dto';
import { FindAllViewAdminPostDto } from './dto/find-all.view-admin-post.dto';
import { FindAllViewUsinPostDto } from './dto/find-all.view-usin-post.dto';
import { FindOneViewAdminPostDto } from './dto/find-one.view-admin-post.dto';
import { FindOneViewUsinPostDto } from './dto/find-one.view-usin-post.dto';
import { RemovePostDto } from './dto/remove.post.dto';
import { PostServiceException } from './exception/post.service-exception';
import { ServicePostRepository } from './repository/service-post.repository';
import { ViewAdminServicePostRepository } from './repository/view-admin.service-post.repository';
import { ViewUsinServicePostRepository } from './repository/view-usin.service-post.repository';
import { EditPostValidator } from './validator/edit.post.validator';
import { RemovePostValidator } from './validator/remove.post.validator';

@Injectable()
export class ServicePostService {
  constructor(
    // repository
    private readonly servicePostRepository: ServicePostRepository,
    private readonly viewAdminServicePostRepository: ViewAdminServicePostRepository,
    private readonly viewUsinServicePostRepository: ViewUsinServicePostRepository,

    // validator
    private readonly editPostValidator: EditPostValidator,
    private readonly removePostValidator: RemovePostValidator,
  ) {}
  /**
   * [어드민] 포스트 목록 조회
   * @param dto
   * @returns
   */
  async findAllAdmin(dto: FindAllViewAdminPostDto) {
    try {
      const [datas, count] = await this.viewAdminServicePostRepository.findAll(
        dto,
      );

      return [datas, count];
    } catch (error) {
      PostServiceException.findAll(error);
    }
  }

  /**
   * [어드민] 포스트 상세 조회
   * @param dto
   */
  async findOneAdmin(dto: FindOneViewAdminPostDto) {
    try {
      const data = await this.viewAdminServicePostRepository.findOneOrThrow(
        dto,
      );

      return data;
    } catch (error) {
      PostServiceException.findOne(error, dto.postId);
    }
  }

  /**
   * [어신] 포스트 목록 조회
   * @param dto
   */
  async findAllUsin(dto: FindAllViewUsinPostDto) {
    try {
      const [datas, count] = await this.viewUsinServicePostRepository.findAll(
        dto,
      );

      return [datas, count];
    } catch (error) {
      PostServiceException.findAll(error);
    }
  }

  /**
   * [어신] 포스트 상세 조회
   * @param dto
   */
  async findOneUsin(dto: FindOneViewUsinPostDto) {
    try {
      const data = await this.viewUsinServicePostRepository.findOneOrThrow(dto);

      return data;
    } catch (error) {
      PostServiceException.findOne(error, dto.postId);
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

      const data = await this.servicePostRepository.create(entity);

      return data;
    } catch (error) {
      PostServiceException.create(error);
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

      const data = await this.servicePostRepository.edit(entity, dto.id);

      return data;
    } catch (error) {
      PostServiceException.edit(error, dto.id);
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

      const data = await this.servicePostRepository.remove(entity, dto.id);

      return data;
    } catch (error) {
      PostServiceException.edit(error, dto.id);
    }
  }
}
