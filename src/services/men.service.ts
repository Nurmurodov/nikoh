import { AppDataSource } from '../db'
import { Men } from '../entities/Men.entity'
import { CreatePersonInput, EditPersonInput } from '../schema/person.schema'

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

export const updateMan = async (man: Men, input: EditPersonInput) => {
  man.last_name = input.last_name || man.last_name
  man.address = input.address || man.address
  man.first_name = input.first_name || man.first_name
  man.father_name = input.father_name || man.father_name
  man.phone = input.phone || man.phone
  man.passport = input.passport || man.passport
  if (input.date_birth) {
    man.date_birth = input.date_birth as any
  }

  await man.save()

  return man
}

export const findManById = async (id: number) => {
  return await menRepository.findOneBy({
    id,
  })
}

export const deleteMan = async (id: number) => {
  return await menRepository.delete({ id })
}
