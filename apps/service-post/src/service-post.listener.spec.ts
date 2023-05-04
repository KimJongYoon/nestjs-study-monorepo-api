import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { PostModel } from '../../../libs/database/src';
import { FindOneViewUsinPostEvent } from './event/find-one.view-usin-post.event';
import { ServicePostRepository } from './repository/service-post.repository';
import {
  postRepository,
  postRepositoryDB,
} from './repository/service-post.repository.spec';
import { ServicePostListener } from './service-post.listener';

jest.setTimeout(20 * 60 * 1000);
describe('ServicePostListener', () => {
  let postListener: ServicePostListener;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        ServicePostListener,
        {
          provide: ServicePostRepository,
          useValue: postRepository,
        },
      ],
    })
      .useMocker(createMock)
      .compile();

    postListener = app.get<ServicePostListener>(ServicePostListener);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('포스트 이벤트 리스너', () => {
    it('포스트 조회수 증가 이벤트', async () => {
      const event = new FindOneViewUsinPostEvent(postRepositoryDB[0] as any);

      const asIs = await postRepository.findOneByPostId(event.data.id);
      const data = await postListener.handlePostFindOneUsin(event);
      const toBe = await postRepository.findOneByPostId(event.data.id);

      const compareData = new PostModel();
      Object.assign(compareData, asIs);
      compareData.readCount = asIs.readCount + 1;

      expect(postRepository.increaseReadCount).toBeCalled();
      expect(compareData).toEqual(toBe);
    });
  });
});
