import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { PostModel } from '../../../../libs/database/src';
import { Prisma } from '../../../../libs/database/src/usin/generated/client';
import { ServicePostRepository } from './service-post.repository';

jest.setTimeout(20 * 60 * 1000);

export const postRepositoryDB: Partial<PostModel>[] = [
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
export const postRepository: Partial<ServicePostRepository> = {
  create: jest
    .fn()
    .mockImplementation((entity: Prisma.PostUncheckedCreateInput) => {
      entity.id = randomUUID();
      entity.createdBy = entity.adminEmail;
      entity.createdAt = new Date();
      postRepositoryDB.push(entity as any);
      return entity;
    }),
  edit: jest
    .fn()
    .mockImplementation(
      (entity: Prisma.PostUncheckedUpdateInput, postId: string) => {
        const index = postRepositoryDB.findIndex((item) => item.id === postId);
        delete (entity as any).validate;
        entity.updatedAt = new Date();
        entity.updatedBy = entity.adminEmail;
        postRepositoryDB[index] = {
          ...postRepositoryDB[index],
          ...entity,
        } as any;
        return postRepositoryDB[index];
      },
    ),
  remove: jest
    .fn()
    .mockImplementation(
      (entity: Prisma.PostUncheckedUpdateInput, postId: string) => {
        const index = postRepositoryDB.findIndex((item) => item.id === postId);
        delete (entity as any).validate;
        entity.updatedAt = new Date();
        entity.updatedBy = entity.adminEmail;
        entity.deletedAt = entity.deletedAt;
        entity.deletedBy = entity.adminEmail;
        postRepositoryDB[index] = {
          ...postRepositoryDB[index],
          ...entity,
        } as any;
        return postRepositoryDB[index];
      },
    ),
  findOneByPostId: jest.fn().mockImplementation(async (postId: string) => {
    return Object.assign(
      {},
      postRepositoryDB.find((item) => item.id === postId),
    );
  }),
  increaseReadCount: jest.fn().mockImplementation((postId: string) => {
    const index = postRepositoryDB.findIndex((item) => item.id === postId);
    postRepositoryDB[index].readCount++;
  }),
};
describe('ServicePostRepository', () => {
  let repository: ServicePostRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [ServicePostRepository],
    })
      .useMocker(createMock)
      .compile();
  });

  it('should be defined', async () => {
    expect(postRepository).toBeDefined();
  });
});
