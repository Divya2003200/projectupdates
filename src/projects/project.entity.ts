// src/projects/project.entity.ts
import {
    Entity, PrimaryGeneratedColumn, Column,
    ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn
  } from 'typeorm';
  import { User } from '../users/user.entity';
  import { Bid } from '../bids/bids.entity';
  import { Message } from '../messages/message.entity';
  import { Milestone } from '../milestones/milestone.entity';
  import { File } from '../files/file.entity';
  import { Invoice } from '../invoices/invoice.entity';
  
  @Entity()
  export class Project {
    @PrimaryGeneratedColumn()                id: number;
    @Column()                                title: string;
    @Column()                                category: string;
    @Column('text')                          description: string;
    @Column('decimal')                       budget: number;
    @Column()                                deadline: string;
    @Column({ default: 'open' })             status: 'open' | 'assigned' | 'completed';
  
    @ManyToOne(() => User, u => u.projects, { eager: true })
                                            client: User;
  
    @ManyToOne(() => User, u => u.assignedProjects, { nullable: true, eager: true })
                                            assignedFreelancer: User;
  
    @OneToMany(() => Bid, bid => bid.project)
                                            bids: Bid[];
  
    @OneToMany(() => Message, msg => msg.project)
                                            messages: Message[];
  
    @OneToMany(() => Milestone, m => m.project)
                                            milestones: Milestone[];
  
    @OneToMany(() => File, f => f.project)
                                            files: File[];
  
    @OneToMany(() => Invoice, inv => inv.project)
                                            invoices: Invoice[];
  
    @CreateDateColumn()                      createdAt: Date;
    @UpdateDateColumn()                      updatedAt: Date;
  }
  