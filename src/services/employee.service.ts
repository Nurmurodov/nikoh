import { CreateEmployeeInput } from '../schema/employee.schema'
import { Employee } from '../entities/Employee.entity'
import { AppDataSource } from '../db'

const employeeRepository = AppDataSource.getRepository(Employee)

export const createEmployee = async (input: CreateEmployeeInput) => {
  try {
    const employee = employeeRepository.create({
      full_name: input.full_name,
      date_birth: input.date_birth,
      address: input.address || '',
      is_active: input.is_active || false,
      password: input.password,
      phone: input.phone,
      role: input.role,
      user_name: input.user_name,
    })

    await employeeRepository.save(employee)

    return employee
  } catch (e) {
    throw new Error(e.message)
  }
}

export const findEmployeeByUsername = async ({
  user_name,
}: {
  user_name: string
}) => {
  return await employeeRepository.findOneBy({ user_name })
}
