import { PrimaryKey, Property, SerializedPrimaryKey } from '@mikro-orm/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';

export abstract class BaseEntity {
  @PrimaryKey()
  _id: string;

  @SerializedPrimaryKey()
  id!: string;

  @Property({ onCreate: () => new Date() })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  toDto<T>(type: { new (): T }): T {
    const jsonData: Record<string, any> = instanceToPlain(this);
    return plainToInstance(type, jsonData);
  }
}
