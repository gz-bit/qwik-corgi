import { $ } from "@builder.io/qwik"

export interface Product {
  id: number
  name: string
  description: string
}

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function getProducts() {
  return await prisma.products.findMany()
}

export async function getProductById(id: number) {
  if (id === 0) {
    return []
  }
  return await prisma.products.findUnique({ where: { id }})
}

export function getSimpleProducts() {
  return simpleProducts
}

export const simpleProducts: Product[] =[
  {
    id: 1,
    name: "Wood Table",
    description: "A simple wooden table",
  },
  {
    id: 2,
    name: "Plastic Table",
    description: "A simple plastic table",
  }
]
