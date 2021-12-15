import { EntityRepository, Repository } from '@mikro-orm/core';
import { Admin } from './entities/admin.entity';

@Repository(Admin)
export class AdminApiRepository extends EntityRepository<Admin> {}
