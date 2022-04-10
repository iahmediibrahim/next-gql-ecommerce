import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { dehydrate, useQuery } from 'react-query'
import { useCart } from 'react-use-cart'
import { productByName, queryClient } from '../../src/api'

export async function getServerSideProps({ params }: any) {
	await queryClient.prefetchQuery('product', () => productByName({ name: params.name }))
	return {
		props: {
			name: params.name,
			dehydratedState: dehydrate(queryClient),
		},
	}
}
const Product: React.FunctionComponent<{ name: string }> = ({ name }) => {
	const { addItem, inCart } = useCart()
	const [isSSR, setIsSSR] = useState(true)

	useEffect(() => {
		setIsSSR(false)
	}, [])
	const { data, error } = useQuery('product', () => productByName({ name }))
	if (!data?.product) return <div className='p-6'>No product with this name.</div>
	const { product } = data
	const alreadyAdded = inCart(product.id)

	return (
		<div className='antialiased'>
			<div className='py-6'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6'>
					<div className='flex flex-col md:flex-row -mx-4'>
						<div className='md:flex-1 px-4'>
							<div className='w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none'>
								<Image
									src={product.image.src as string}
									alt={product.image.alt as string}
									className='w-full h-full object-center object-cover lg:w-full lg:h-full'
									height={'600'}
									width={'1080'}
								/>
							</div>
						</div>
						<div className='md:flex-1 px-4'>
							<h2 className='mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl'>
								{product.name}
							</h2>
							<p className='text-gray-500 text-sm'>
								Category{' '}
								<a href='#' className='text-indigo-600 hover:underline'>
									{product.category}
								</a>
							</p>

							<div className='flex items-center space-x-4 my-4'>
								<div>
									<div className='rounded-lg bg-gray-100 flex py-2 px-3'>
										<span className='text-indigo-400 mr-1 mt-1'>$</span>
										<span className='font-bold text-indigo-600 text-3xl'>{product.price}</span>
									</div>
								</div>
								<div className='flex-1'>
									<p className='text-green-500 text-xl font-semibold'>Save 12%</p>
									<p className='text-gray-400 text-sm'>Inclusive of all Taxes.</p>
								</div>
							</div>

							<p className='text-gray-500'>{product.details?.description}</p>

							<div className='flex py-4 space-x-4  items-center'>
								<button
									type='button'
									onClick={() => addItem(product)}
									className='h-8 min-w-full mt-6 px-6 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white'>
									{!isSSR && alreadyAdded ? 'Add again' : 'Add to Cart'}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default Product
