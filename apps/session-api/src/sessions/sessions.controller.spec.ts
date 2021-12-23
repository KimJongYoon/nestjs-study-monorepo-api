import { Test, TestingModule } from '@nestjs/testing';
import { SessionsModule } from './sessions.module';
import { MainModule } from '../main.module';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

const requestFunction = (url: string, data: string, app: INestApplication) => {
  return request(app.getHttpServer()).get(url).expect(200).expect(data);
};

describe('SessionsController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MainModule, SessionsModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe('/ (GET)', () => {
    it('/ (GET)', () => {
      return requestFunction('/', 'Hello, World!', app);
    });
  });

  // describe('/ (GET)', () => {
  //   it('/ (GET)', () => {
  //     return request(app.getHttpServer()).get('/').expect(201).expect('123');
  //   });
  // });
});
