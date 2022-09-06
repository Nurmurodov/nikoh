import {
  Column,
  Entity,
  BaseEntity,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Employee } from './Employee.entity'

@Entity('session')
export class SessionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  number: number

  @OneToOne(() => Employee)
  @JoinColumn()
  profile: Employee
}
