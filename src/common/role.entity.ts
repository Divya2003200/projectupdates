import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum RoleType {
  CLIENT = 'client',
  FREELANCER = 'freelancer',
}

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: RoleType, unique: true })
  name: RoleType;
    static CLIENT: any;
    static FREELANCER: any;
}
