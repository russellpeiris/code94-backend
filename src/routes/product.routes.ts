import { Router } from 'express'
import { imageUpload } from '../../utils/fileStorage.util'
import {
  addToFavorites,
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
productRouter.post('/add-to-favorites/:sku', addToFavorites)
productRouter.post(
  '/upload-images',
  imageUpload.array('files'),
  uploadProductImages,
)

export default productRouter
