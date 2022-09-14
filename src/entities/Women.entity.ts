import { Entity, Column, OneToMany } from 'typeorm'

import { Person } from './utils/Person.entity'
import { Marriage } from './Marriage.entity'

@Entity('women')
export class Women extends Person {
  @OneToMany(() => Marriage, (marriage) => marriage.woman)
  marriage: Marriage[]

  @Column({ nullable: true })
  count_divorce: number

  @Column({ nullable: true })
  last_married_man_id: number
}
