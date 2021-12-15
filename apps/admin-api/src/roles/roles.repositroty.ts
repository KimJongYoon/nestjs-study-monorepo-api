import {EntityRepository, Repository} from "@mikro-orm/core";
import {Role} from "./entities/role.entity";

@Repository(Role)
export class RolesRepositroty extends EntityRepository<Role> {}