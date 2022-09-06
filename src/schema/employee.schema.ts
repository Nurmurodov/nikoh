import { string, object, z, boolean, TypeOf } from 'zod'
import { Role } from '../enums/Role'

export const createEmployeeSchema = object({
  body: object({
    full_name: string({
      required_error: 'F.I.O majburiy',
    }),
    password: string({
      required_error: 'Parol majburiy',
    })
      .min(8, 'Parol juda qisqa')
      .max(32, 'Parol juda uzun'),
    passwordConfirm: string({
      required_error: 'Parol tasdiqlanmagan',
    }),
    address: string().nullable(),
    phone: string({
      required_error: 'Telefon kiritilmagan!',
    }).length(13, 'Telefon raqami xato'),
    user_name: string({
      required_error: 'User name kiritilmagan',
    }).min(8, 'User name qisqa'),
    date_birth: string({
      required_error: "Tug'ilgan kun kiritilmagan!",
    }),
    is_active: boolean({
      required_error: "Activelik boolean bo'lishi kerak",
    }).nullable(),
    role: z.optional(z.nativeEnum(Role)),
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Parollar mos emas',
  }),
})

export type CreateEmployeeInput = Omit<
  TypeOf<typeof createEmployeeSchema>['body'],
  'passwordConfirm'
>
