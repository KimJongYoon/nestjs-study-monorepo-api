import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { PostModel } from '../../../../libs/database/src';
import { FindOneViewUsinPostEvent } from './event/find-one.view-usin-post.event';
import { UsinPostRepository } from './repository/usin-post.repository';
import {
  usinPostMockRepository,
  usinPostRepositoryDB,
} from './repository/usin-post.repository.spec';
import { UsinPostListener } from './usin-post.listener';

jest.setTimeout(20 * 60 * 1000);
describe('UsinPostListener', () => {
  let postListener: UsinPostListener;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UsinPostListener,
        {
          provide: UsinPostRepository,
          useValue: usinPostMockRepository,
        },
      ],
    })
      .useMocker(createMock)
      .compile();

    postListener = app.get<UsinPostListener>(UsinPostListener);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('포스트 이벤트 리스너', () => {
    it('포스트 조회수 증가 이벤트', async () => {
      const event = new FindOneViewUsinPostEvent(
        usinPostRepositoryDB[0] as any,
      );

      const asIs = await usinPostMockRepository.findOneByPostId(event.data.id);
      const data = await postListener.handlePostFindOneUsin(event);
      const toBe = await usinPostMockRepository.findOneByPostId(event.data.id);

      const compareData = new PostModel();
      Object.assign(compareData, asIs);
      compareData.readCount = asIs.readCount + 1;

      expect(usinPostMockRepository.increaseReadCount).toBeCalled();
      expect(compareData).toEqual(toBe);
    });
  });
});
