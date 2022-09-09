import {
  CreateEmployeeInput,
  EditEmployeeInput,
} from '../schema/employee.schema'
import { Employee } from '../entities/Employee.entity'
import { AppDataSource } from '../db'
import { Session } from '../entities/Session.entity'

const employeeRepository = AppDataSource.getRepository(Employee)

export const createEmployee = async (input: CreateEmployeeInput) => {
  try {
    const employee = employeeRepository.create({
      full_name: input.full_name,
      date_birth: input.date_birth || undefined,
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

export const findEmployeeByUsername = async (user_name: string) => {
  try {
    return await employeeRepository
      .createQueryBuilder('employee')
      .select()
      .leftJoinAndSelect('employee.session', 'session')
      .where('employee.user_name = :user_name', { user_name: user_name })
      .getOne()
  } catch (e) {
    throw new Error(e.message)
  }
}

export const getEmployeeById = async (id: number) => {
  return await employeeRepository
    .createQueryBuilder('employee')
    .select()
    .leftJoinAndSelect('employee.session', 'session')
    .where('employee.id = :id', { id: id })
    .getOne()
}

export const connectSessionToEmployee = async (
  session: Session,
  employee: Employee
) => {
  try {
    employee.session = session
    await employee.save()
  } catch (e) {
    throw new Error(e.message)
  }
}

export const getAllEmployee = async (
  page: number,
  size: number,
  search: string
) => {
  return await employeeRepository
    .createQueryBuilder('employee')
    .select()
    .limit(size)
    .offset(size * (page - 1))
    .getMany()
}

export const getCountEmployees = async () => {
  return await employeeRepository.createQueryBuilder('employee').getCount()
}

export const deleteEmployee = async (id: number) => {
  return await employeeRepository.delete({ id })
}

export const editEmployee = async (
  employee: Employee,
  input: EditEmployeeInput
) => {
  try {
    employee.role = input.role || employee.role
    employee.phone = input.phone || employee.phone
    employee.address = input.address || employee.address
    employee.is_active = input.is_active || employee.is_active
    employee.full_name = input.full_name || employee.full_name
    employee.user_name = input.user_name || employee.user_name
    if (input.date_birth) {
      employee.date_birth = input.date_birth as any
    }

    await employee.save()

    return employee
  } catch (e) {
    throw new Error(e.message)
  }
}
