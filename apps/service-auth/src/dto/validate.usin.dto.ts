import { PickType } from '@nestjs/swagger';
import { UserModel } from '../../../../libs/database/src/usin/models/user/user.model';

export class ValidateUsinDto extends PickType(UserModel, ['uid', 'password']) {}
