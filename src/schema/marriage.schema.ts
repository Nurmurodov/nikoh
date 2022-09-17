import { string, object, TypeOf, boolean, number } from 'zod'

export const marriageSchema = object({
  body: object({
    dowry: string({
      required_error: 'Mahr kiritilmagan',
    }),
    is_payed_dowry: boolean().default(false),
    witnesses: string({
      required_error: 'Guvohlar kiritishda xatolik',
    }).array(),
    man_id: number({
      required_error: 'Erkak kiritilmagan',
    }).min(1, 'Xato idlik erkak kiritilgan'),
    woman_id: number({
      required_error: 'Ayol kiritilmagan',
    }).min(1, 'Xato idlik ayol kiritilgan'),
  }),
})

export type MarriageInput = TypeOf<typeof marriageSchema>['body']
