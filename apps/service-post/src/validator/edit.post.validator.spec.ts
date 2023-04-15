import { createMock } from '@golevelup/ts-jest';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PostModel } from '../../../../libs/database/src/usin';
import { EditPostDto } from '../dto/edit.post.dto';
import { ServicePostRepository } from '../repository/service-post.repository';
import { CommonPostValidator } from './common.post.validator';
import { EditPostValidator } from './edit.post.validator';

jest.setTimeout(20 * 60 * 1000);
describe('EditPostValidator', () => {
  let editPostValidator: EditPostValidator;
  let repository: ServicePostRepository;
  const repositoryTemp: Partial<PostModel>[] = [
    {
      id: 'id',
      title: 'title',
    },
  ];

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [EditPostValidator, CommonPostValidator],
    })
      .useMocker(createMock)
      .compile();

    editPostValidator = app.get<EditPostValidator>(EditPostValidator);
    repository = app.get<ServicePostRepository>(ServicePostRepository);

    repository.findOneByPostId = jest
      .fn()
      .mockImplementation((postId: string) => {
        return repositoryTemp.find((item) => item.id === postId);
      });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('포스트 수정', () => {
    it('포스트 id 유효성 검사', async () => {
      const dto = new EditPostDto();
      dto.id = 'invalidId';

      const result = async () => {
        await editPostValidator.validate(dto);
      };

      await expect(result).rejects.toThrowError(
        new BadRequestException(`post: ${dto.id} is not exist`),
      );
      expect(repository.findOneByPostId).toBeCalledWith(dto.id);
    });
  });
});
