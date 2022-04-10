import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { dehydrate, useQuery } from 'react-query'
import { useCart } from 'react-use-cart'
import { getProducts, queryClient } from '../src/api'
import { Product } from './../src/schema/products'

export async function getServerSideProps() {
	await queryClient.prefetchQuery('products', () => getProducts())
	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	}
}
const Home: NextPage = () => {
	const { addItem, inCart } = useCart()
	const [isSSR, setIsSSR] = useState(true)

	useEffect(() => {
		setIsSSR(false)
	}, [])
	const { error, data } = useQuery('products', () => getProducts())
	if (!data?.products) return <div className='p-6'>No product with this name.</div>
	const { products } = data
	return (
		<div className='max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
			<h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>Products</h2>

			<div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2  lg:grid-cols-4 xl:gap-x-8'>
				{products.map((product: Product) => {
					const alreadyAdded = inCart(product.id)

					return (
						<div key={product.id} className='group relative'>
							<Link href={`/product/${product.name}`} passHref>
								<div className='w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none'>
									<Image
										src={product?.image?.src as string}
										alt={product?.image?.alt as string}
										className='w-full h-full object-center object-cover lg:w-full lg:h-full'
										height={'1920'}
										width={'1080'}
										layout='responsive'
									/>
								</div>
							</Link>

							<div className='mt-4 flex justify-between'>
								<div>
									<h3 className='text-lg text-gray-900'>{product.name}</h3>
									<p className='mt-1 text-sm text-gray-500 capitalize'>{product.category}</p>
								</div>
								<p className='text-sm font-medium text-gray-900'>{product.price}$</p>
							</div>

							<button
								onClick={() => addItem(product)}
								className='h-8 min-w-full mt-6 px-6 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white'>
								{!isSSR && alreadyAdded ? 'Add again' : 'Add to Cart'}
							</button>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Home
