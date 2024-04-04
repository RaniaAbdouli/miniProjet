import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  username: string;
  
  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  avatarUrl: string;
}
