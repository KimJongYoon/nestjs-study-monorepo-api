import { Repository } from '@mikro-orm/core';
import { Test } from './entities/test.entity';
import { EntityRepository } from '@mikro-orm/mongodb';

@Repository(Test)
export class TestRepository extends EntityRepository<Test> {}
