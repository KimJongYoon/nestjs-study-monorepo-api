import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { BaseEntity } from 'apps/common/src/base.entities';

@Entity()
export class Test extends BaseEntity {
  @Property({ nullable: false })
  name: string;

  @Property({ nullable: false })
  age: number;
}
