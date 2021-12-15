import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { RolesRepositroty } from './roles.repositroty';
import { ObjectId } from '@mikro-orm/mongodb';
import { FilterQuery, wrap } from '@mikro-orm/core';
import { CustomException } from '../../../common/src/exception/custom.exception';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepositroty) {}

  async create(createRoleDto: CreateRoleDto) {
    const role: Role = createRoleDto.toEntity(Role);
    await this.rolesRepository.persistAndFlush(role);
    return role;
  }

  async findAll() {
    return this.rolesRepository.findAll();
  }

  async findOne(id: string) {
    // @ts-ignore
    const roles = this.rolesRepository.findOne(ObjectId(id));
    if (!!roles)
      throw new CustomException(
        HttpStatus.NOT_FOUND,
        '등록되지 않은 권한입니다.',
      );
    return { roles };
  }

  async find(filterQuery: FilterQuery<Role>) {
    return this.rolesRepository.find(filterQuery);
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    // @ts-ignore
    const savedRole = await this.rolesRepository.findOne(ObjectId(id));
    wrap(savedRole).assign(updateRoleDto);
    await this.rolesRepository.flush();
    return savedRole;
  }

  async remove(id: string) {
    // @ts-ignore
    await this.rolesRepository.nativeDelete({ id: ObjectId(id) });
    return `This action removes a #${id} role`;
  }
}
