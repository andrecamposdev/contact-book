import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Contact } from '@interfaces/contacts.interface';
import { UserEntity } from './users.entity';

@Entity()
export class ContactEntity extends BaseEntity implements Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  first_name: string;

  @Column()
  @IsNotEmpty()
  last_name: string;

  @Column({ type: 'varchar', length: 15 })
  @IsNotEmpty()
  telephone: string;

  @Column()
  @IsNotEmpty()
  birthday: Date;

  @Column()
  @IsNotEmpty()
  address: string;

  @Column()
  @IsNotEmpty()
  email: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @IsNotEmpty()
  user_id: number;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.contacts, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;
}
