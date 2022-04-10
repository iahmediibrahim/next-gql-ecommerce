import { GraphQLClient } from 'graphql-request'
import { QueryClient } from 'react-query'
import { getSdk } from './generated/graphql'
// updated
const gqlClient = new GraphQLClient('https://next-gql-ecommerce.vercel.app/api/graphql')

export const { getProducts, productByName } = getSdk(gqlClient)
export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
		},
	},
})
