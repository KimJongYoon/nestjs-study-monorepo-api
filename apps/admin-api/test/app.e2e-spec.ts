import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AdminApiModule } from '../src/admin/admin-api.module';
import { MainModule } from '../src/main.module';
import { before } from '@nestjs/swagger/dist/plugin';
import {Admin} from "../src/admin/entities/admin.entity";

describe('AdminApiController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MainModule, AdminApiModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true }),
    );
    await app.init();
  });

  describe('Admin Module', () => {
    jest.setTimeout(60 * 1000); // 타임아웃 설정

    beforeEach(async () => {
      const uncleared = await request(app.getHttpServer()).get('/admin');
      await Promise.all(
        uncleared.body.map(async (admin) => {
          return request(app.getHttpServer()).delete(`/admin/${admin.id}`);
        }),
      );
    });

    /**
     * 데이터 조회
     */
    it('/admin (GET)', async () => {
      const data = await request(app.getHttpServer()).get('/admin').expect(200);
      expect(data).toBeTruthy();
      expect(data.body.length).toBe(0);
      return data;
    });

    const newAdmin = {
      email: 'mion@gmail.com',
      password: '1111',
      role: {
        role_code: 20,
      },
    };

    /**
     * 테스트 데이터 등록
     */
    it('/admin (POST)', async () => {
      const data = await request(app.getHttpServer())
        .post('/admin')
        .send(newAdmin)
        .expect(201);
      expect(data).toBeTruthy();
      expect(data.header).toHaveProperty('location');
      expect(data.header.location).toStrictEqual(expect.any(String));

      const savedData = await request(app.getHttpServer())
        .get(`/admin/${data.header.location}`)
        .expect(200);
      expect(savedData.body).toBeTruthy();
      expect(savedData.body.role.role_code).toBe(20);
      console.log(savedData.body);
      return data;
    });

    /**
     * 테스트 데이터 등록(충돌) 테스트
     */
    it('/admin (POST)', async () => {
      let data = await request(app.getHttpServer())
        .post('/admin')
        .send(newAdmin)
        .expect(201);

      data = await request(app.getHttpServer())
        .post('/admin')
        .send(newAdmin)
        .expect(409);
      expect(data).toBeTruthy();
      return data;
    });
  });
});
