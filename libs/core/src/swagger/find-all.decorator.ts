import { Type, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { FindOneResponse } from '../response/find-one.response';

export const ApiFindAllResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(FindOneResponse) },
          {
            properties: {
              items: {
                type: 'array',
                $ref: getSchemaPath(model),
              },
            },
          },
        ],
      },
    }),
  );
};
