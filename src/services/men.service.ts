import { AppDataSource } from '../db'
import { Men } from '../entities/Men.entity'
import { CreatePersonInput } from '../schema/person.schema'

const menRepository = AppDataSource.getRepository(Men)

export const createMan = async (input: CreatePersonInput) => {
  const man = menRepository.create({
    last_name: input.last_name,
    address: input?.address || undefined,
    first_name: input.first_name,
    father_name: input.father_name,
    phone: input.phone,
    passport: input.passport,
    date_birth: input.date_birth,
  })

  await menRepository.save(man)

  return man
}
