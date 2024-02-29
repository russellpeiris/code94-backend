import { Router } from 'express'
import { createProduct } from '../controllers/product.controller'

const productRoute = Router()

productRoute.post('/create-product', createProduct)
