import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  first_name: string

  @Column()
  last_name: string

  @Column()
  father_name: string

  @Column()
  date_birth: Date

  @Column({
    length: 9,
    unique: true,
  })
  passport: string

  @Column({
    length: 13,
  })
  phone: string

  @Column({
    nullable: true,
  })
  address: string

  @Column({
    length: 9,
    unique: true,
  })
  @CreateDateColumn()
  created_date: Date

  @UpdateDateColumn()
  updated_date: Date
}
