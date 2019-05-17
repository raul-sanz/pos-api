'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with products
 */
const Product = use('App/Models/Product')

class ProductController {
  
  async index ({ request, response, view, auth }) {

    const user = await auth.getUser()

    const products = await Product.query().where('company_id', user.company_id).fetch()

    return response.json({
      status: 'succes',
      data: products
    })
  }


  async store ({ request, response }) {
    try {
      const product = await Product.create({
        category_id:request.input('category_id'),
        name:request.input('name'),
        price:request.input('price'),
        code:request.input('code'),
        stock:request.input('stock'),
        description:request.input('description'),
        type:request.input('type'),
        type:request.input('model'),
        type:request.input('color'),
        type:request.input('brand'),
        max_stock:request.input('max'),
        min_stock:request.input('min'),
        company_id:request.input('company_id')
      })

      return response.json({
        status: 'success',
        data: product
      })
    } catch (error) {
      console.log(error);
      return response.status(400).json({
        status:'error',
        message: 'intenta mas tarde'
      })
    }
  }

 
  async show ({ params, request, response, view }) {
    const product = await Product.find(params.id)

    if (!product) {
      return response.status(404).json({status:'error', message:'Producto no encontrado'})
    }

    return response.json({
      status: 'success',
      data:product
    })
  }


  async update ({ params, request, response }) {
    const product = await Product.find(params.id)

    if ( !product ) {
      return response.status(404).json({status:'error', message:'Producto no encontrado'}) 
    }
    
    product.category_id = request.input('category_id'),
    product.name = request.input('name'),
    product.price = request.input('price'),
    product.code = request.input('code'),
    product.stock = request.input('stock'),
    product.description = request.input('description'),
    product.type = request.input('type'),
    product.max_stock = request.input('max_stock'),
    product.min_stock = request.input('min_stock')

    await product.save()

    return response.status(201).json({
      status: 'success',
      data: product
    })
  }


  async destroy ({ params, request, response }) {
    const product = await Product.find(params.id)

    if (!product) {
      return response.status(404).json({status:'error', message:'Producto no encontrado'})
    }

    product.delete()

    return response.status(204).json({
      staus:'success',
      data: null
    })
  }
}

module.exports = ProductController
