import { Request, Response } from 'express'
import Product, { IProduct } from '../schemas/product.schema'
import User from '../schemas/user.schema'
import { IRequestWithUser } from './auth.controller'
import { uploadImages } from './uploads.controller'

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
    //TODO: Add pagination & search on frontend
    const page = parseInt(req.query.page as string) - 1 || 0
    const limit = parseInt(req.query.limit as string) || 10
    const search = (req.query.search as string) || ''
    const products = await Product.find({
      sku: { $regex: search, $options: 'i' },
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
    //TODO: After frontend for auth done
    // const userId = req.userId
    // const user = await User.findOne({ _id: userId })
    // if (!user) {
    //   throw new Error('User not found')
    // }
    // user.favorites.push(product.sku)
    // await user.save()

    product.isFavorite = true
    await product.save()

    res.status(200).json({ message: 'Product added to favorites' })
  } catch (error: any) {
    console.error(error.message)
    res.status(500).json({ message: error.message })
  }
}

async function getFavorites(req: IRequestWithUser, res: Response) {
  try {
    const userId = req.userId
    const user = await User.findOne({ _id: userId })
    if (!user) {
      throw new Error('No favorites found')
    }
    const products: IProduct[] = []

    for (const favorite of user.favorites) {
      const product = await Product.findOne({ sku: favorite })
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

async function uploadProductImages(req: IRequestWithUser, res: Response) {
  try {
    const urlKey = `${req.userId}/${req.body.sku}`
    const files = req.files as Express.Multer.File[]
    const productImages = await uploadImages(files, urlKey)

    if (!productImages) {
      throw new Error('Failed to upload images')
    }

    res.status(200).json({ productImages })
  } catch (error: any) {
    console.error(error.message)
    res.status(500).json({ message: error.message })
  }
}
export {
  addToFavorites,
  createProduct,
  deleteProduct,
  getFavorites,
  getProductBySku,
  getProducts,
  searchProduct,
  updateProduct,
  uploadProductImages,
}
