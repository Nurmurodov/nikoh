import { string, object, z, boolean, TypeOf, nullable } from 'zod'
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
    address: string().nullable().default(null),
    phone: string({
      required_error: 'Telefon kiritilmagan!',
    }).length(13, 'Telefon raqami xato'),
    user_name: string({
      required_error: 'User name kiritilmagan',
    }).min(8, 'User name qisqa'),
    date_birth: nullable(
      string({
        required_error: "Tug'ilgan kun kiritilmagan!",
      })
    ),
    is_active: boolean({
      required_error: "Activelik boolean bo'lishi kerak",
    })
      .nullable()
      .default(null),
    role: z.optional(z.nativeEnum(Role)),
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Parollar mos emas',
  }),
})

export const editEmployeeSchema = object({
  body: object({
    full_name: string({
      required_error: 'F.I.O majburiy',
    })
      .nullable()
      .default(null),
    address: string().nullable().default(null),
    phone: string({
      required_error: 'Telefon kiritilmagan!',
    })
      .length(13, 'Telefon raqami xato')
      .nullable()
      .default(null),
    user_name: string({
      required_error: 'User name kiritilmagan',
    })
      .min(8, 'User name qisqa')
      .nullable()
      .default(null),
    date_birth: string({
      required_error: "Tug'ilgan kun kiritilmagan!",
    })
      .nullable()
      .default(null),
    is_active: boolean({
      required_error: "Activelik boolean bo'lishi kerak",
    })
      .nullable()
      .default(null),
    role: z.optional(z.nativeEnum(Role)).nullable(),
  }),
})

export type EditEmployeeInput = TypeOf<typeof editEmployeeSchema>['body']

export type CreateEmployeeInput = Omit<
  TypeOf<typeof createEmployeeSchema>['body'],
  'passwordConfirm'
>
