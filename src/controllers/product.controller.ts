import { Request, Response } from 'express'
import Product, { IProduct } from '../schemas/product.schema'
import { IRequestWithUser } from './auth.controller'

async function createProduct(req: Request, res: Response) {
  try {
    const newProduct = await Product.create(req.body)
    await newProduct.validate()
    await newProduct.save()

    res
      .status(201)
      .json({ message: 'Product created successfully', product: newProduct })
  } catch (error: any) {
    console.error(error.message)
    res.status(500).json({ message: error.message })
  }
}

async function getProducts(req: Request, res: Response) {
  try {
    const products = await Product.find()
    if (!products) {
      throw new Error('No products found')
    }
    res.status(200).json({ products })
  } catch (error: any) {
    console.error(error.message)
    res.status(500).json({ message: error.message })
  }
}

async function getProductBySku(req: Request, res: Response) {
  try {
    const { sku } = req.params
    const product = await Product.findOne({ sku })
    // .select('productName')

    if (!product) {
      throw new Error('Product not found')
    }
    res.status(200).json({ product })
  } catch (error: any) {
    console.error(error.message)
    res.status(500).json({ message: error.message })
  }
}

async function updateProduct(req: Request, res: Response) {
  try {
    const { sku } = req.params
    const updatedProduct = await Product.findOne({ sku })
    if (!updatedProduct) {
      throw new Error('Product not found')
    }

    updatedProduct.set(req.body)
    await updatedProduct.validate()
    await updatedProduct.save()

    res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct,
    })
  } catch (error: any) {
    console.error(error.message)
    res.status(500).json({ message: error.message })
  }
}

async function deleteProduct(req: Request, res: Response) {
  try {
    const { sku } = req.params
    const deletedProduct = await Product.findOneAndDelete({ sku })
    if (!deletedProduct) {
      throw new Error('Product not found')
    }
    res.status(200).json({
      message: 'Product deleted successfully',
      product: deletedProduct,
    })
  } catch (error: any) {
    console.error(error.message)
    res.status(500).json({ message: error.message })
  }
}

async function searchProduct(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) - 1 || 0
    const limit = parseInt(req.query.limit as string) || 10
    const search = (req.query.search as string) || ''
    const products = await Product.find({
      productName: { $regex: search, $options: 'i' },
    })
      .skip(page * limit)
      .limit(limit)

    const response = {
      products,
      page: page + 1,
      limit,
      total: products.length,
    }

    res.status(200).json({ response })
  } catch (error: any) {
    console.error(error.message)
    res.status(500).json({ message: error.message })
  }
}

async function addToFavorites(req: IRequestWithUser, res: Response) {
  try {
    const { sku } = req.params
    const product = await Product.findOne({ sku })
    if (!product) {
      throw new Error('Product not found')
    }

    const user = req.user
    user.favorites.push(product._id)
    await user.save()

    res.status(200).json({ message: 'Product added to favorites' })
  } catch (error: any) {
    console.error(error.message)
    res.status(500).json({ message: error.message })
  }
}

async function getFavorites(req: IRequestWithUser, res: Response) {
  try {
    const user = req.user
    const favorites = await user.populate('favorites').execPopulate()
    const products: IProduct[] = []

    for (const favorite of favorites.favorites) {
      const product = await Product.findOne({ sku: favorite.sku })
      if (product) {
        products.push(product)
      }
    }

    res.status(200).json({ products })
  } catch (error: any) {
    console.error(error.message)
    res.status(500).json({ message: error.message })
  }
}
export {
  createProduct,
  getProducts,
  getProductBySku,
  updateProduct,
  deleteProduct,
  searchProduct,
  addToFavorites,
  getFavorites,
}
