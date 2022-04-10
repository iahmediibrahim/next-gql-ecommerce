import type { AppProps } from 'next/app'
import { Hydrate, QueryClientProvider } from 'react-query'
import { CartProvider } from 'react-use-cart'
import Layout from '../components/Layout'
import { queryClient } from '../src/api'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<CartProvider
					id='jamie'
					onItemAdd={(item) => console.log(`Item ${item.id} added!`)}
					onItemUpdate={(item) => console.log(`Item ${item.id} updated.!`)}
					onItemRemove={() => console.log(`Item removed!`)}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</CartProvider>
			</Hydrate>
		</QueryClientProvider>
	)
}

export default MyApp
