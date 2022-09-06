import {
  Column,
  Entity,
  BaseEntity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Employee } from './Employee.entity'

@Entity('session')
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  number: number

  @OneToOne(() => Employee, (employee) => employee.session) // specify inverse side as a second parameter
  employee: Employee
}
