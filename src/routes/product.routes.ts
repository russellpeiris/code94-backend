import { Request, Response, Router } from 'express'
import { imageUpload } from '../../utils/fileStorage.util'
import {
  createProduct,
  deleteProduct,
  getFavorites,
  getProductBySku,
  getProducts,
  searchProduct,
  updateProduct,
  uploadProductImages,
} from '../controllers/product.controller'

const productRouter = Router()

productRouter.post('/create-product', createProduct)
productRouter.get('/get-products', getProducts)
productRouter.get('/get-product/:sku', getProductBySku)
productRouter.put('/update-product/:sku', updateProduct)
productRouter.delete('/delete-product/:sku', deleteProduct)
productRouter.get('/search-product/:sku', searchProduct)
productRouter.get('/user-favorites', getFavorites)
productRouter.post(
  '/upload-images',
  imageUpload.array('images'),
  uploadProductImages,
)

export default productRouter
