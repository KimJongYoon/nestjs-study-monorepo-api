import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { PostModel } from '../../../libs/database/src';
import { BooleanTypes } from '../../../libs/database/src/usin/generated/client';
import { CreatePostDto } from './dto/create.post.dto';
import { EditPostDto } from './dto/edit.post.dto';
import { RemovePostDto } from './dto/remove.post.dto';
import { ServicePostRepository } from './repository/service-post.repository';
import {
  postRepository,
  postRepositoryDB,
} from './repository/service-post.repository.spec';
import { ServicePostService } from './service-post.service';
import { EditPostValidator } from './validator/edit.post.validator';

jest.setTimeout(20 * 60 * 1000);
describe('ServicePostService', () => {
  let postService: ServicePostService;
  let editPostValidator: EditPostValidator;
  let postId: string;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        ServicePostService,
        {
          provide: ServicePostRepository,
          useValue: postRepository,
        },
      ],
    })
      .useMocker(createMock)
      .compile();

    postService = app.get<ServicePostService>(ServicePostService);
    editPostValidator = app.get<EditPostValidator>(EditPostValidator);
  });

  afterEach(() => {});

  describe('포스트', () => {
    it('등록 테스트', async () => {
      const dto = new CreatePostDto();
      dto.adminEmail = 'mion@gmail.com';
      dto.title = '테스트';
      dto.content = '테스트';

      const data = await postService.create(dto);
      const toBe = await postRepository.findOneByPostId(data.id);

      const compareData = new PostModel();
      Object.assign(compareData, toBe);
      compareData.title = dto.title;
      compareData.content = dto.content;
      compareData.adminEmail = dto.adminEmail;

      expect(postRepository.create).toBeCalled();
      expect(compareData).toEqual(toBe);

      postId = toBe.id;
    });

    it('수정 테스트', async () => {
      console.log(postRepositoryDB);
      const dto = new EditPostDto();
      dto.id = postId;
      dto.title = '수정';
      dto.content = '수정';
      dto.thumbnailUrl = '수정된 썸네일 url';
      dto.remark = '수정된 비고';
      dto.adminEmail = 'mion2@gmail.com';

      const spyDto = jest.spyOn(dto, 'validate');

      const asIs = await postRepository.findOneByPostId(dto.id);
      await postService.edit(dto);
      const toBe = await postRepository.findOneByPostId(dto.id);

      const compareData = new PostModel();
      Object.assign(compareData, asIs);

      compareData.title = dto.title;
      compareData.content = dto.content;
      compareData.thumbnailUrl = dto.thumbnailUrl;
      compareData.adminEmail = dto.adminEmail;
      compareData.remark = dto.remark;
      compareData.updatedBy = dto.adminEmail;
      compareData.updatedAt = toBe.updatedAt;

      expect(spyDto).toBeCalled();
      expect(postRepository.edit).toBeCalled();
      expect(compareData).toEqual(toBe);
    });

    it('삭제 테스트', async () => {
      const dto = new RemovePostDto();
      dto.id = postId;
      dto.adminEmail = 'mion2@gmail.com';

      const spyDto = jest.spyOn(dto, 'validate');

      const asIs = await postRepository.findOneByPostId(dto.id);
      await postService.remove(dto);
      const toBe = await postRepository.findOneByPostId(dto.id);

      const compareData = new PostModel();
      Object.assign(compareData, asIs);

      compareData.useYn = BooleanTypes.N;
      compareData.updatedBy = toBe.updatedBy;
      compareData.updatedAt = toBe.updatedAt;
      compareData.deletedBy = dto.adminEmail;
      compareData.deletedAt = toBe.deletedAt;

      expect(spyDto).toBeCalled();
      expect(postRepository.remove).toBeCalled();
      expect(compareData).toEqual(toBe);
      expect(compareData.deletedAt).not.toBeNull();
    });
  });
});
