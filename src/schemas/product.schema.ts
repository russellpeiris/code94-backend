import { Schema, model } from 'mongoose'

export interface IProduct extends Document {
  sku: string
  productQuantity?: number
  productName?: string
  productPrice?: number
  productImages?: string[]
  productDescription?: string
}

const productSchema = new Schema({
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  productQuantity: {
    type: Number,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productImages: {
    type: [String],
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
})

const Product = model<IProduct>('Product', productSchema)

export default Product
