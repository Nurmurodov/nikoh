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
