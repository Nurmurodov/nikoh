import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Employee } from './Employee.entity'
import { Men } from './Men.entity'
import { Women } from './Women.entity'

@Entity('marriage')
export class Marriage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  dowry: string

  @Column({
    default: false,
  })
  is_payed_dowry: boolean

  @Column({
    default: true,
  })
  is_active: boolean

  @Column({ type: 'simple-array' })
  witnesses: string[]

  @Column({
    nullable: true,
  })
  cancelled_date: Date

  @Column({
    nullable: true,
  })
  divorce_count: number

  @ManyToOne(() => Employee, (employee) => employee.created_marriages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'created_employee_id',
  })
  created_employee: Employee

  @ManyToOne(() => Employee, (employee) => employee.cancelled_marriages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'cancelled_employee_id',
  })
  cancelled_employee: Employee

  @CreateDateColumn()
  created_date: Date

  @UpdateDateColumn()
  updated_date: Date

  @ManyToOne(() => Men, (man) => man.marriage, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'man_id',
  })
  man: Men

  @ManyToOne(() => Women, (woman) => woman.marriage, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'woman_id',
  })
  woman: Women
}
