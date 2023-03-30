import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../../../libs/microservice/src/dto/create.user.dto';
import { ServiceUserController } from './service-user.controller';
import { ServiceUserService } from './service-user.service';

describe('ServiceUserController', () => {
  let serviceUserController: ServiceUserController;
  let userService: ServiceUserService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServiceUserController],
      providers: [ServiceUserService],
    })
      .useMocker(createMock)
      .compile();

    serviceUserController = app.get<ServiceUserController>(
      ServiceUserController,
    );
    userService = app.get<ServiceUserService>(ServiceUserService);

    userService.create = jest.fn().mockImplementation((dto: CreateUserDto) => {
      return { uid: dto.uid };
    });
  });

  afterEach(async () => {
    jest.restoreAllMocks();
  });

  describe('사용자 등록', () => {
    it('사용자 등록', async () => {
      const dto = new CreateUserDto();
      dto.uid = 'test';
      dto.nickName = '닉네임';
      dto.email = 'mion@gmail.com';
      dto.password = '12345a!';

      const result = await serviceUserController.create(dto);

      expect(userService.create).toBeCalledWith(dto);
      expect(userService.create).toHaveBeenCalledTimes(1);
      expect(serviceUserController.create(dto)).resolves.toBe({ uid: dto.uid });
    });
  });
});
