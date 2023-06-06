import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { PostModel } from '../../../../../libs/database/src/usin';
import { UsinPostRepository } from './usin-post.repository';

jest.setTimeout(20 * 60 * 1000);

export const usinPostRepositoryDB: Partial<PostModel>[] = [
  {
    id: '1',
    title: '테스트',
    content: '테스트',
    createdBy: 'mion@gmail.com',
    createdAt: new Date(),
    updatedBy: 'mion@gmail.com',
    updatedAt: new Date(),
    readCount: 0,
  },
];
export const usinPostMockRepository: Partial<UsinPostRepository> = {
  increaseReadCount: jest.fn().mockImplementation((postId: string) => {
    const index = usinPostRepositoryDB.findIndex((item) => item.id === postId);
    usinPostRepositoryDB[index].readCount++;
  }),

  findOneByPostId: jest.fn().mockImplementation(async (postId: string) => {
    return Object.assign(
      {},
      usinPostRepositoryDB.find((item) => item.id === postId),
    );
  }),
};
describe('UsinPostRepository', () => {
  let repository: UsinPostRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [UsinPostRepository],
    })
      .useMocker(createMock)
      .compile();
  });

  it('should be defined', async () => {
    expect(usinPostMockRepository).toBeDefined();
  });
});
