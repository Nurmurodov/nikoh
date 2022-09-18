import { AppDataSource } from '../db'
import { Marriage } from '../entities/Marriage.entity'
import { MarriageInput } from '../schema/marriage.schema'
import { Employee } from '../entities/Employee.entity'
import { Men } from '../entities/Men.entity'
import { Women } from '../entities/Women.entity'

const marriageRepository = AppDataSource.getRepository(Marriage)

export const createMarriage = async (
  input: MarriageInput,
  created_employee: Employee,
  man: Men,
  woman: Women
) => {
  const marriage = marriageRepository.create({
    man,
    woman,
    is_payed_dowry: input.is_payed_dowry,
    dowry: input.dowry,
    created_employee,
    witnesses: input.witnesses,
  })

  await marriageRepository.save(marriage)

  return marriage
}

export const cancelMarriage = async (
  marriage: Marriage,
  cancelled_employee: Employee,
  divorce_count: number
) => {
  marriage.is_active = false
  marriage.cancelled_employee = cancelled_employee
  marriage.cancelled_date = new Date()
  marriage.divorce_count = divorce_count

  await marriage.save()

  return marriage
}

export const getMarriageById = async (id: number) => {
  return await marriageRepository
    .createQueryBuilder('marriage')
    .where('marriage.id = :id', { id: id })
    .select()
    .innerJoinAndSelect('marriage.man', 'man')
    .innerJoinAndSelect('marriage.woman', 'woman')
    .getOne()
}
