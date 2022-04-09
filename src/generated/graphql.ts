import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Product = {
  __typename?: 'Product';
  bestseller: Scalars['Boolean'];
  category: Scalars['String'];
  currency: Scalars['String'];
  details?: Maybe<ProductDetails>;
  featured: Scalars['Boolean'];
  image: ProductImage;
  name: Scalars['ID'];
  price: Scalars['Float'];
};

export type ProductDetails = {
  __typename?: 'ProductDetails';
  description: Scalars['String'];
  recommendations: Array<ProductImage>;
  thickness: Scalars['Float'];
  weight: Scalars['Float'];
};

export type ProductImage = {
  __typename?: 'ProductImage';
  alt?: Maybe<Scalars['String']>;
  src?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  products: Array<Product>;
};

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', name: string, category: string, price: number, currency: string, bestseller: boolean, featured: boolean, image: { __typename?: 'ProductImage', src?: string | null, alt?: string | null }, details?: { __typename?: 'ProductDetails', weight: number, thickness: number, description: string, recommendations: Array<{ __typename?: 'ProductImage', src?: string | null, alt?: string | null }> } | null }> };


export const GetProductsDocument = gql`
    query getProducts {
  products {
    name
    category
    price
    currency
    image {
      src
      alt
    }
    bestseller
    featured
    details {
      weight
      thickness
      description
      recommendations {
        src
        alt
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getProducts(variables?: GetProductsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetProductsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProductsQuery>(GetProductsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProducts', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;