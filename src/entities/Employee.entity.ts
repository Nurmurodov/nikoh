import {
  Entity,
  Column,
  BaseEntity,
  OneToOne,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm'
import config from 'config'
import bcrypt from 'bcryptjs'

import { Role } from '../enums/Role'
import { Session } from './Session.entity'

@Entity('employee')
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    unique: true,
  })
  user_name: string

  @Column()
  full_name: string

  @Column({
    unique: true,
    length: 13,
  })
  phone: string

  @Column({
    nullable: true,
  })
  address: string

  @Column({
    type: 'enum',
    enum: Role,
  })
  role: string

  @Column({
    type: 'boolean',
    default: false,
  })
  is_active: boolean

  @Column({ type: 'date' })
  date_birth: Date

  @Column()
  password: string

  @CreateDateColumn()
  created_at: Date

  @OneToOne(() => Session, (session) => session.employee) // specify inverse side as a second parameter
  @JoinColumn()
  session: Session

  @UpdateDateColumn()
  updated_at: Date

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, config.get('salt_factory'))
  }

  static async comparePasswords(
    candidatePassword: string,
    hashedPassword: string
  ) {
    return await bcrypt.compare(candidatePassword, hashedPassword)
  }

  toJSON() {
    return { ...this, password: undefined, session: undefined }
  }
}
