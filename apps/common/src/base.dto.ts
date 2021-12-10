import { classToPlain, plainToClass } from 'class-transformer';

export class BaseDto {
  // static async toEntity<D, E>(dto : D, e : ClassConstructor<E>) : Promise<E> {
  //   const data = classToPlain(dto);
  //   return Object.assign({}, plainToClass(e, data));
  // }
  //
  // static async toDto<E, D>(entity : E, d : ClassConstructor<D>) : Promise<D> {
  //   const data = classToPlain(entity);
  //   return Object.assign({}, plainToClass(d, data));
  // }

  toEntity<T>(type: { new (): T }): T {
    const jsonData: Record<string, any> = classToPlain(this);
    return plainToClass(type, jsonData);
  }
}
