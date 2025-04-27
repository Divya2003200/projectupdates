// // src/common/decorators/roles.decorator.ts
// import { SetMetadata } from '@nestjs/common';
// import { Role } from '../role.entity';

// export const ROLES_KEY = 'roles';
// export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);


import { SetMetadata } from '@nestjs/common';
import { RoleType } from '../role.entity';

export const ROLES_KEY = 'roles';
// Accept RoleType values, not Role instances
export const Roles = (...roles: RoleType[]) => SetMetadata(ROLES_KEY, roles);
