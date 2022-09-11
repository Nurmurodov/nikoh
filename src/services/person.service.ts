import { CreatePersonInput, EditPersonInput } from '../schema/person.schema'
import { AppDataSource } from '../db'
import { Person } from '../entities/Person.entity'

const personRepository = AppDataSource.getRepository(Person)

export const createPerson = async (input: CreatePersonInput) => {
  try {
    const person = personRepository.create({
      first_name: input.first_name,
      last_name: input.last_name,
      father_name: input.father_name,
      address: input.address || undefined,
      gender: input.gender,
      date_birth: input.date_birth,
      phone: input.phone,
      passport: input.passport,
    })

    await personRepository.save(person)

    return person
  } catch (e) {
    throw new Error(e.message)
  }
}

export const getPersonById = async (id: number) => {
  return await personRepository.findOneBy({ id })
}

export const editPerson = async (person: Person, input: EditPersonInput) => {
  try {
    person.phone = input.phone || person.phone
    person.passport = input.passport || person.passport
    person.address = input.address || person.address
    person.gender = input.gender || person.gender
    person.father_name = input.father_name || person.father_name
    person.first_name = input.first_name || person.first_name
    person.last_name = input.last_name || person.last_name

    if (input.date_birth) {
      person.date_birth = input.date_birth as any
    }

    await person.save()

    return person
  } catch (e) {
    throw new Error(e.message)
  }
}

export const deletePerson = async (id: number) => {
  return await personRepository.delete({ id })
}

export const getCountPerson = async () => {
  return await personRepository.createQueryBuilder('person').getCount()
}

export const getAllPerson = async (
  page: number,
  size: number,
  search: string
) => {
  return await personRepository
    .createQueryBuilder('person')
    .select()
    .limit(size)
    .offset(size * (page - 1))
    .where('person.first_name ILIKE :search', { search: `%${search}%` })
    .orWhere('person.phone ILIKE :search', { search: `%${search}%` })
    .orWhere('person.last_name ILIKE :search', { search: `%${search}%` })
    .orWhere('person.father_name ILIKE :search', { search: `%${search}%` })
    .getMany()
}
