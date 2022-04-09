import { ApolloServer } from 'apollo-server-micro'
import type { NextApiRequest, NextApiResponse } from 'next'
import 'reflect-metadata'
import { buildSchema, Field, ID, ObjectType, Query, Resolver } from 'type-graphql'
@ObjectType()
export class Product {
	@Field(() => ID)
	name: string | undefined
}
@Resolver(Product)
export class ProductsResolver {
	@Query(() => [Product])
	products(): Product[] {
		return [{ name: 'test' }, { name: 'test 2' }]
	}
}
const schema = await buildSchema({
	resolvers: [ProductsResolver],
})
const server = new ApolloServer({ schema })
export const config = {
	api: {
		bodyParser: false,
	},
}
const startServer = server.start()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	await startServer
	await server.createHandler({ path: '/api/graphql' })(req, res)
}
