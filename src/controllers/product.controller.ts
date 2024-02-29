import { Request, Response } from 'express'
import Product from '../schemas/product.schema'

async function createProduct(req: Request, res: Response) {
  try {
    const newProduct = await Product.create(req.body)
    newProduct.validate()
    newProduct.save()

    res
      .status(201)
      .json({ message: 'Product created successfully', product: newProduct })
  } catch (error: any) {
    console.error(error.message)
  }
}

export { createProduct }
