import { Type } from '@nestjs/common';
import { PickType } from '@nestjs/swagger';
import { AssignHelper } from '../helper/assign.helper';

/**
 * Abstract Data Response
 * @param classRef
 * @param keys
 * @returns
 */
export function AbstractPickDataResponse<T>(
  classRef: Type<T>,
  keys: readonly any[],
) {
  abstract class AbstractPickDataResponse extends PickType(classRef, keys) {
    constructor(data: T) {
      super();
      const filtered = AssignHelper.filter(data, keys as string[]);

      Object.assign(this, filtered);
    }
  }

  return AbstractPickDataResponse as unknown as new (data: T) => Pick<
    T,
    (typeof keys)[number]
  >;
}
