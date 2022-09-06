import { string, object, TypeOf } from 'zod'

export const loginSchema = object({
  body: object({
    password: string({
      required_error: 'Parol majburiy',
    }),
    user_name: string({
      required_error: 'Username majburiy',
    }),
  }),
})

export type LoginInput = TypeOf<typeof loginSchema>['body']
