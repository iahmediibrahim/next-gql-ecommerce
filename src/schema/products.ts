import { Field, ID, ObjectType } from 'type-graphql'
@ObjectType()
export class ProductImage {
	@Field(() => String, { nullable: true })
	src?: string | null | undefined

	@Field(() => String, { nullable: true })
	alt?: string | null | undefined
}
@ObjectType()
export class ProductDetails {
	@Field(() => Number)
	weight!: number
	@Field(() => Number)
	thickness!: number
	@Field(() => String)
	description!: string
	@Field(() => [ProductImage])
	recommendations!: ProductImage[]
}
@ObjectType()
export class Product {
	@Field(() => ID)
	id!: string
	@Field(() => String)
	name!: string
	@Field(() => String)
	category!: string
	@Field(() => Number)
	price!: number
	@Field(() => String)
	currency!: string
	@Field(() => ProductImage)
	image!: ProductImage | null
	@Field(() => Boolean)
	bestseller!: boolean
	@Field(() => Boolean)
	featured!: boolean
	@Field(() => ProductDetails, { nullable: true })
	details?: ProductDetails | null
}
