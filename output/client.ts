import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const UserSignup = z
  .object({ email: z.string().email(), password: z.string() })
  .passthrough();
const User = z
  .object({
    id: z.number().int(),
    email: z.string(),
    password: z.string(),
    resetPasswordToken: z.string().nullable(),
    resetPasswordSentAt: z.string().datetime({ offset: true }).nullable(),
    rememberCreatedAt: z.string().datetime({ offset: true }).nullable(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const UserLogin = z
  .object({ email: z.string(), password: z.string() })
  .passthrough();
const Product = z
  .object({
    id: z.number().int(),
    name: z.string(),
    description: z.string().nullable(),
    price: z.number(),
    storeId: z.number().int(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const ProductInput = z
  .object({
    name: z.string(),
    description: z.string().optional(),
    price: z.number(),
    storeId: z.number().int(),
  })
  .passthrough();
const Store = z
  .object({
    id: z.number().int(),
    name: z.string(),
    address: z.string(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();

export const schemas = {
  UserSignup,
  User,
  UserLogin,
  Product,
  ProductInput,
  Store,
};

const endpoints = makeApi([
  {
    method: "post",
    path: "/auth/login",
    alias: "postAuthlogin",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UserLogin,
      },
    ],
    response: z.object({ token: z.string() }).partial().passthrough(),
    errors: [
      {
        status: 401,
        description: `Invalid credentials`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/auth/logout",
    alias: "postAuthlogout",
    requestFormat: "json",
    response: z.object({ message: z.string() }).partial().passthrough(),
  },
  {
    method: "post",
    path: "/auth/signup",
    alias: "postAuthsignup",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UserSignup,
      },
    ],
    response: z
      .object({ message: z.string(), user: User })
      .partial()
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Email already in use`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/products",
    alias: "getProducts",
    requestFormat: "json",
    response: z.array(Product),
  },
  {
    method: "post",
    path: "/products",
    alias: "postProducts",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: ProductInput,
      },
    ],
    response: Product,
  },
  {
    method: "get",
    path: "/products/:id",
    alias: "getProductsId",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Product,
    errors: [
      {
        status: 404,
        description: `Product not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "put",
    path: "/products/:id",
    alias: "putProductsId",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: ProductInput,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Product,
    errors: [
      {
        status: 404,
        description: `Product not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "delete",
    path: "/products/:id",
    alias: "deleteProductsId",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 404,
        description: `Product not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/stores",
    alias: "postStores",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Store,
      },
    ],
    response: Store,
  },
  {
    method: "get",
    path: "/stores",
    alias: "getStores",
    requestFormat: "json",
    response: z.array(Store),
  },
  {
    method: "get",
    path: "/stores/:id",
    alias: "getStoresId",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Store,
    errors: [
      {
        status: 404,
        description: `Store not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "put",
    path: "/stores/:id",
    alias: "putStoresId",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Store,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Store,
    errors: [
      {
        status: 404,
        description: `Store not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "delete",
    path: "/stores/:id",
    alias: "deleteStoresId",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 404,
        description: `Store not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/stores/:storeId/products",
    alias: "getStoresStoreIdproducts",
    requestFormat: "json",
    parameters: [
      {
        name: "storeId",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.array(Product),
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
