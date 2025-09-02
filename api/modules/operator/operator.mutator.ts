// import type { CustomMutatorDefs, } from '@rocicorp/zero'
// import chalk from 'chalk'
// import type { UserType } from '#/db/'
// import { schema, Operators } from '#/db/zero'
// import * as defaultProducts from './products.json'
// import { nanoid } from '#/utils/nanoid'

// export function createOperatorMutators(user: UserType | undefined) {
//     return {
//         operator: {
//             create: async (tx, args: Operators) => {
//                 if (user?.role !== 'ADMIN') {
//                     console.log(chalk.red('Unauthorized: User is not an admin.'))
//                     throw new Error('Unauthorized: User is not an admin.')
//                 }

//                 console.log(chalk.blue(`Creating new operator named "${args.name}"...`))
//                 const id = nanoid()
//                 await tx.mutate.operators.insert({
//                     id,
//                     name: args.name,
//                     // ... other fields
//                     ownerId: user.id,
//                     operatorSecret: '',
//                     operatorAccess: '',
//                     callbackUrl: '',
//                     isActive: false,
//                     allowedIps: '',
//                     balance: 0,
//                     netRevenue: 0,
//                     acceptedPayments: [],
//                     createdAt: 0,
//                     updatedAt: 0
//                 })

//                 const productsToInsert = defaultProducts.map((p) => ({
//                     ...p,
//                     id: nanoid(),
//                     operatorId: id,
//                     createdAt: new Date().getTime(),
//                     updatedAt: new Date().getTime(),
//                 }))

//                 for (const product of productsToInsert) {

//                     await tx.mutate.products.insert(product)
//                 }

//                 await tx.mutate.users.update({
//                     id: user.id,
//                     activeOperatorId: id,
//                 })

//                 console.log(chalk.green(`Operator "${args.name}" created successfully.`))
//                 // return newOperator as Operators
//             },
//             // ... other operator mutators like createProduct
//         },
//     } as const satisfies CustomMutatorDefs<typeof schema>
// }

// export type Mutators = ReturnType<typeof createOperatorMutators>