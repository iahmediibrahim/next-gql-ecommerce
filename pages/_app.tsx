import type { AppProps } from 'next/app'
import { ReactNode } from 'react'
import { Hydrate, QueryClientProvider } from 'react-query'
import { CartProvider } from 'react-use-cart'
import Layout from '../components/Layout'
import { queryClient } from '../src/api'
import '../styles/globals.css'
declare module 'react-query/types/react/QueryClientProvider' {
	interface QueryClientProviderProps {
		children?: ReactNode
	}
}
declare module 'react-query/types/react/Hydrate' {
	interface HydrateProps {
		children?: ReactNode
	}
}

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<CartProvider id='cart'>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</CartProvider>
			</Hydrate>
		</QueryClientProvider>
	)
}

export default MyApp
