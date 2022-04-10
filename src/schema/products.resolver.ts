import { Arg, Query, Resolver } from 'type-graphql'
import { Product } from './products'
import products from './products.json'

@Resolver(Product)
export class ProductsResolver {
	@Query(() => Product, { nullable: true })
	product(@Arg('name', () => String) name: string): Product | undefined {
		const product = products.find((product) => product.name === name)
		if (product === undefined) throw new Error('Product not found!')
		return product
	}
	@Query(() => [Product])
	products(): Product[] {
		return products
	}
}
