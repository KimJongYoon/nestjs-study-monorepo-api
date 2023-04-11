import { Type, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { FindOneResponse } from '../response/find-one.response';

export const ApiFindOneResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(FindOneResponse) },
          {
            properties: {
              item: { $ref: getSchemaPath(model) },
            },
          },
        ],
      },
    }),
  );
};
