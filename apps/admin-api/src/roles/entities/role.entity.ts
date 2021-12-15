import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { BaseEntity } from 'apps/common/src/base.entities';
import { Admin } from '../../admin/entities/admin.entity';

@Entity()
export class Role extends BaseEntity {
  @Property({ nullable: false, type: 'number' })
  role_code: number;

  @Property({ nullable: false, type: 'string' })
  role_name: string;

  @OneToMany('Admin', 'role')
  admin = new Collection<Admin>(this);
}
