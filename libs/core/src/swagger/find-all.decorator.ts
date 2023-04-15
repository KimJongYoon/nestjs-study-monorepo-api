import { Type, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { FindAllResponse } from '../response/find-all.response';

export const ApiFindAllResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(FindAllResponse) },
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
