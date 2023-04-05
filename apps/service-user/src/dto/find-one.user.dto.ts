import { PickType } from '@nestjs/swagger';
import { UserModel } from '../../../../libs/database/src/usin/models/user/user.model';

export class FindOneUserDto extends PickType(UserModel, ['uid']) {}
