import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from './generated/client';

@Injectable()
export class UsinDatabaseService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
    this.$use(async (params, next) => {
      if (params.action == 'create' || params.action == 'createMany') {
        params.args.data['createdAt'] = new Date();
        params.args.data['updatedAt'] = new Date();
      } else if (params.action == 'update' || params.action == 'updateMany') {
        params.args.data['updatedAt'] = new Date();
      } else if (params.action == 'delete' || params.action == 'deleteMany') {
        if (params.args?.['deletedAt']) params.args['deletedAt'] = new Date();
      }

      const result = await next(params);

      return result;
    });
  }

  /**
   * 선택사항이나 생략하면 Prisma는 데이터베이스에 처음 연결할 때 느립니다.
   */
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * 생략 가능 합니다.
   * @param app
   */
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
