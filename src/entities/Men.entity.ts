import { Entity, Column, OneToMany } from 'typeorm'

import { Person } from './utils/Person.entity'
import { Marriage } from './Marriage.entity'

@Entity('men')
export class Men extends Person {
  @OneToMany(() => Marriage, (marriage) => marriage.man)
  marriage: Marriage[]

  @Column({ nullable: true })
  count_marriage: number
}
