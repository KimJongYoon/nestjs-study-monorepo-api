import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from 'apps/common/src/base.entities';

@Entity()
export class Role extends BaseEntity {
  @Property({ nullable: false, type: 'number' })
  role_code: number;

  @Property({ nullable: false, type: 'string' })
  role_name: string;
}
