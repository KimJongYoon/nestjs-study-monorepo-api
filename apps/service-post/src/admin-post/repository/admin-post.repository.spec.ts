import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { PostModel } from '../../../../../libs/database/src/usin';
import { Prisma } from '../../../../../libs/database/src/usin/generated/client';
import { AdminPostRepository } from './admin-post.repository';

jest.setTimeout(20 * 60 * 1000);

export const adminPostRepositoryDB: Partial<PostModel>[] = [
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
export const adminPostMockRepository: Partial<AdminPostRepository> = {
  create: jest
    .fn()
    .mockImplementation((entity: Prisma.PostUncheckedCreateInput) => {
      entity.id = randomUUID();
      entity.createdBy = entity.adminEmail;
      entity.createdAt = new Date();
      adminPostRepositoryDB.push(entity as any);
      return entity;
    }),
  edit: jest
    .fn()
    .mockImplementation(
      (entity: Prisma.PostUncheckedUpdateInput, postId: string) => {
        const index = adminPostRepositoryDB.findIndex(
          (item) => item.id === postId,
        );
        delete (entity as any).validate;
        entity.updatedAt = new Date();
        entity.updatedBy = entity.adminEmail;
        adminPostRepositoryDB[index] = {
          ...adminPostRepositoryDB[index],
          ...entity,
        } as any;
        return adminPostRepositoryDB[index];
      },
    ),
  remove: jest
    .fn()
    .mockImplementation(
      (entity: Prisma.PostUncheckedUpdateInput, postId: string) => {
        const index = adminPostRepositoryDB.findIndex(
          (item) => item.id === postId,
        );
        delete (entity as any).validate;
        entity.updatedAt = new Date();
        entity.updatedBy = entity.adminEmail;
        entity.deletedAt = entity.deletedAt;
        entity.deletedBy = entity.adminEmail;
        adminPostRepositoryDB[index] = {
          ...adminPostRepositoryDB[index],
          ...entity,
        } as any;
        return adminPostRepositoryDB[index];
      },
    ),
  findOneByPostId: jest.fn().mockImplementation(async (postId: string) => {
    return Object.assign(
      {},
      adminPostRepositoryDB.find((item) => item.id === postId),
    );
  }),
};
describe('AdminPostRepository', () => {
  let repository: AdminPostRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AdminPostRepository],
    })
      .useMocker(createMock)
      .compile();
  });

  it('should be defined', async () => {
    expect(adminPostMockRepository).toBeDefined();
  });
});
