import { BaseEntity } from 'apps/common/src/base.entities';
import {
  Entity,
  ManyToOne,
  PrimaryKeyProp,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Role } from '../../roles/entities/role.entity';

@Entity()
export class Admin extends BaseEntity {
  @Property({ nullable: false, unique: true, type: 'string' }) // mongodb unique not working
  email: string;

  @Property({ nullable: false, type: 'string' })
  password: string;

  @ManyToOne()
  role: Role;
}
