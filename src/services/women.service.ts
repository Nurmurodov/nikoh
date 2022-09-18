import { AppDataSource } from '../db'
import { Women } from '../entities/Women.entity'
import { CreatePersonInput, EditPersonInput } from '../schema/person.schema'
import { Brackets } from 'typeorm'

const womenRepository = AppDataSource.getRepository(Women)

export const createWoman = async (input: CreatePersonInput) => {
  const woman = womenRepository.create({
    last_name: input.last_name,
    address: input?.address || undefined,
    first_name: input.first_name,
    father_name: input.father_name,
    phone: input.phone,
    passport: input.passport,
    date_birth: input.date_birth,
  })

  await womenRepository.save(woman)

  return woman
}

export const updateWoman = async (woman: Women, input: EditPersonInput) => {
  woman.last_name = input.last_name || woman.last_name
  woman.address = input.address || woman.address
  woman.first_name = input.first_name || woman.first_name
  woman.father_name = input.father_name || woman.father_name
  woman.phone = input.phone || woman.phone
  woman.passport = input.passport || woman.passport
  if (input.date_birth) {
    woman.date_birth = input.date_birth as any
  }

  await woman.save()

  return woman
}

export const newMarriageWoman = async (woman: Women, man_id: number) => {
  if (woman.last_married_man_id !== man_id) {
    woman.count_divorce = 0
    await woman.save()
  }

  return woman
}

export const cancelMarriageWoman = async (
  woman: Women,
  man_id: number,
  count_divorce: number
) => {
  woman.last_married_man_id = man_id
  woman.count_divorce = woman.count_divorce
    ? woman.count_divorce + count_divorce
    : count_divorce

  await woman.save()

  return woman
}

export const findWomanById = async (id: number) => {
  return await womenRepository.findOneBy({
    id,
  })
}

export const deleteWoman = async (id: number) => {
  return await womenRepository.delete({ id })
}

export const getWomen = async (page: number, size: number, search: string) => {
  return await womenRepository
    .createQueryBuilder('women')
    .select()
    .limit(size)
    .offset(size * (page - 1))
    .where('women.first_name ILIKE :search', { search: `%${search}%` })
    .orWhere('women.last_name ILIKE :search', { search: `%${search}%` })
    .orWhere('women.father_name ILIKE :search', { search: `%${search}%` })
    .orWhere('women.phone ILIKE :search', { search: `%${search}%` })
    .getMany()
}

export const getWomanMarriageList = async (id: number) => {
  return await womenRepository
    .createQueryBuilder('women')
    .leftJoinAndSelect('women.marriage', 'marriage')
    .where('women.id = :id', {
      id: id,
    })
    .getOne()
}

export const getWomenForMarriage = async (search: string) => {
  return await womenRepository
    .createQueryBuilder('women')
    .select([
      'women.first_name',
      'women.last_name',
      'women.father_name',
      'women.phone',
      'women.passport',
      'women.count_divorce',
    ])
    .leftJoinAndSelect('women.marriage', 'marriage')
    .where(
      new Brackets((qb) => {
        qb.where('women.first_name ILIKE :search', {
          search: `%${search}%`,
        })
          .orWhere('women.last_name ILIKE :search', {
            search: `%${search}%`,
          })
          .orWhere('women.father_name ILIKE :search', {
            search: `%${search}%`,
          })
          .orWhere('women.phone ILIKE :search', {
            search: `%${search}%`,
          })
      })
    )
    .getMany()
}

export const getCountWomen = async (search: string) => {
  return await womenRepository
    .createQueryBuilder('women')
    .where('women.first_name ILIKE :search', { search: `%${search}%` })
    .orWhere('women.last_name ILIKE :search', { search: `%${search}%` })
    .orWhere('women.father_name ILIKE :search', { search: `%${search}%` })
    .orWhere('women.phone ILIKE :search', { search: `%${search}%` })
    .getCount()
}
