import { PartialType } from '@nestjs/swagger';
import { UserModel } from '../../../../../libs/database/src';

export class EditUserDto extends PartialType(UserModel) {}
