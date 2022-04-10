import { ApolloServer } from 'apollo-server-micro'
import type { NextApiRequest, NextApiResponse } from 'next'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { ProductsResolver } from '../../src/schema/products.resolver'
const schema = await buildSchema({
	resolvers: [ProductsResolver],
})
const server = new ApolloServer({
	schema,
	introspection: true,
})
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
