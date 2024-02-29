import { Router } from 'express'
import {
  createProduct,
  deleteProduct,
  getProductBySku,
  getProducts,
  searchProduct,
  updateProduct,
} from '../controllers/product.controller'

const productRouter = Router()

productRouter.post('/create-product', createProduct)
productRouter.get('/get-products', getProducts)
productRouter.get('/get-product/:sku', getProductBySku)
productRouter.put('/update-product/:sku', updateProduct)
productRouter.delete('/delete-product/:sku', deleteProduct)
productRouter.get('/search-product/:sku', searchProduct)

export default productRouter
