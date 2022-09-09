import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Person } from './Person.entity'
import { Employee } from './Employee.entity'

@Entity('marriage')
export class Marriage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  dowry: string

  @Column()
  is_payed_dowry: boolean

  @Column()
  is_active: boolean

  @Column()
  married_number: number

  @ManyToMany(() => Person, { cascade: true })
  witness: Person[]

  @ManyToOne(() => Person, (person) => person.marriages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'man_id',
  })
  man: Person

  @ManyToOne(() => Employee, (employee) => employee.marriages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'employee_id',
  })
  employee: Person

  @ManyToOne(() => Person, (person) => person.marriages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'women_id',
  })
  women: Person

  @CreateDateColumn()
  created_date: Date

  @UpdateDateColumn()
  updated_date: Date
}
