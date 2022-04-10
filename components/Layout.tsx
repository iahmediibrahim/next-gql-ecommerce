import { Popover } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useCart } from 'react-use-cart'

const Layout: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
	const { isEmpty, cartTotal, totalUniqueItems, items, updateItemQuantity, removeItem, emptyCart } = useCart()
	const [isSSR, setIsSSR] = useState(true)

	useEffect(() => {
		setIsSSR(false)
	}, [])
	return (
		<div className='bg-white'>
			<div className='bg-white shadow-sm sticky top-0 z-10'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 md:py-4'>
					<div className='flex items-center justify-between md:justify-start'>
						<button
							type='button'
							className='md:hidden w-10 h-10 rounded-lg -ml-2 flex justify-center items-center'>
							<svg
								className='text-gray-500 w-6 h-6'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M4 6h16M4 12h16M4 18h16'
								/>
							</svg>
						</button>

						<Link href='/' className='font-bold text-gray-700 text-2xl'>
							Shop.
						</Link>
						<div className='hidden md:flex space-x-3 flex-1 lg:ml-8'>
							<a
								href='#'
								className='px-2 py-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600'>
								Electronics
							</a>
							<a
								href='#'
								className='px-2 py-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600'>
								Fashion
							</a>
						</div>
						<Popover as='div' className='relative'>
							<Popover.Button className='flex h-10 items-center px-2 rounded-lg border border-gray-200 hover:border-gray-300 focus:outline-none hover:shadow-inner'>
								<svg
									className='h-6 w-6 leading-none text-gray-300 stroke-current'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
									/>
								</svg>
								<span className='pl-1 text-gray-500 text-md'>{!isSSR && totalUniqueItems}</span>
							</Popover.Button>
							<Popover.Panel className='absolute right-0 w-56 z-10 max-w-sm px-4 mt-3   sm:px-0 lg:max-w-3xl'>
								<div className='overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
									<div className='relative bg-white p-2'>
										{isEmpty && <p>Your cart is empty</p>}
										<h1 className='text-gray-500 mb-2'>Total - {!isSSR && cartTotal}$</h1>
										{items.map((item) => (
											<div key={item.id} className='grid grid-cols-2 gap-2 mb-4'>
												<Image
													src={item.image.src}
													alt={item.image.alt}
													height={'120'}
													width={'120'}
													layout='responsive'
													className='rounded-lg'
												/>
												<div>
													<h3 className='text-gray-900 mb-2'>
														{item.quantity} x {item.name}
													</h3>
													<div className='flex items-center justify-between'>
														<button
															className='h-8 mt-2 px-4 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white'
															onClick={() =>
																updateItemQuantity(item.id, item?.quantity - 1)
															}>
															-
														</button>
														<button
															className='h-8 mt-2 px-4 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white'
															onClick={() =>
																updateItemQuantity(item.id, item?.quantity + 1)
															}>
															+
														</button>
													</div>

													<button
														className='h-8 min-w-full mt-2 px-4 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white'
														onClick={() => removeItem(item.id)}>
														Remove &times;
													</button>
												</div>
											</div>
										))}

										<div className='opacity-75'>
											{!isEmpty && (
												<button
													className='h-8 min-w-full px-6 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white'
													onClick={emptyCart}>
													Empty cart
												</button>
											)}
										</div>
									</div>
								</div>
							</Popover.Panel>
						</Popover>
					</div>
				</div>
			</div>
			{children}
		</div>
	)
}
export default Layout
