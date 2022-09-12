import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm'
import { Gender } from '../enums/Gender'
import { Marriage } from './Marriage.entity'

@Entity('person')
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
    length: 13,
  })
  phone: string

  @Column()
  address: string

  @Column({
    length: 9,
    unique: true,
  })
  passport: string

  @Column({
    type: 'enum',
    enum: Gender,
  })
  gender: string

  @Column({
    default: false,
  })
  have_active_marriage: boolean

  @ManyToMany(() => Marriage, { cascade: true })
  @JoinTable({
    name: 'witness_marriage',
    joinColumn: {
      name: 'person',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'marriage',
      referencedColumnName: 'id',
    },
  })
  marriage: Marriage[]

  @OneToMany(() => Marriage, (marriage) => marriage.man || marriage.women)
  marriages: Marriage[]

  @CreateDateColumn()
  created_date: Date

  @UpdateDateColumn()
  updated_date: Date
}
