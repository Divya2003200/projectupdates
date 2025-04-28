// // src/users/dto/create-user.dto.ts
// import { IsEmail, IsString, MinLength, IsIn } from 'class-validator';
// import { Role } from 'src/common/roles.entity';

// export class CreateUserDto {
//   @IsString() name: string;
//   @IsEmail() email: string;
//   @IsString() @MinLength(6) password: string;
//   @IsIn([Role.CLIENT, Role.FREELANCER]) role: Role;
// }
import { IsEmail, IsString, MinLength, IsIn } from 'class-validator';
import { RoleType } from 'src/common/role.entity'; // Import RoleType enum

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsIn([RoleType.CLIENT, RoleType.FREELANCER]) // Use RoleType enum here
  role: RoleType; // The role should be of type RoleType, not Role entity
}
