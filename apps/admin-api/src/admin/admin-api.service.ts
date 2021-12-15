import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminApiRepository } from './admin.repository';
import { Admin } from './entities/admin.entity';
import { RolesService } from '../roles/roles.service';
import { FilterQuery, wrap } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { CustomException } from '../../../common/src/exception/custom.exception';
import { HasherHelper } from '../../../session-api/src/hasher.helper';

@Injectable()
export class AdminApiService {
  constructor(
    private readonly adminApiRepository: AdminApiRepository,
    private readonly rolesService: RolesService,
  ) {}

  async create(createAdminDtoDto: CreateAdminDto) {
    const admin: Admin = createAdminDtoDto.toEntity(Admin);
    const savedAdmin = await this.find({
      email: admin.email,
    });

    if (savedAdmin?.[0])
      throw new CustomException(
        HttpStatus.CONFLICT,
        `이미 등록된 email 입니다.(${admin.email})`,
      );

    const role = await this.rolesService.find({
      role_code: admin.role.role_code,
    });
    admin.role = role[0];
    admin.password = await HasherHelper.hash(admin.password);

    await this.adminApiRepository.persistAndFlush(admin);
    delete admin.password;
    return admin;
  }

  async findAll() {
    const admins = await this.adminApiRepository.findAll(['role']);
    admins.map((admin) => {
      delete admin.password;
      return admin;
    });
    return admins;
  }

  async findOne(id: string) {
    // @ts-ignore
    const admin = await this.adminApiRepository.findOne(ObjectId(id), ['role']);
    if (!admin)
      throw new CustomException(
        HttpStatus.NOT_FOUND,
        '등록되지 않은 사용자 입니다.',
      );
    return admin;
  }

  async find(filterQuery: FilterQuery<Admin>) {
    return await this.adminApiRepository.find(filterQuery, ['role']);
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    // @ts-ignore
    const savedAdmin = await this.adminApiRepository.findOne(ObjectId(id), [
      'role',
    ]);
    wrap(savedAdmin).assign(updateAdminDto);
    await this.adminApiRepository.flush();
    return savedAdmin;
  }

  async remove(id: string) {
    // @ts-ignore
    await this.adminApiRepository.nativeDelete({ id: ObjectId(id) });
    return `This action removes a #${id} admin`;
  }
}
