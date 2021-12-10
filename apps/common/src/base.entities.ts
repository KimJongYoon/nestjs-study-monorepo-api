import { PrimaryKey, Property, SerializedPrimaryKey } from '@mikro-orm/core';
import { classToPlain, plainToClass } from 'class-transformer';

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
    const jsonData: Record<string, any> = classToPlain(this);
    return plainToClass(type, jsonData);
  }
}
