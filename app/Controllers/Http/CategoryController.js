'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with categories
 */
const Category = use('App/Models/Category')

class CategoryController {
  async index ({ request, response, view }) {
    const categories = await Category.all()

    return response.json({
      status: 'succes',
      data: categories
    })
  }


  async store ({ request, response }) {
    try {
      const category = await Category.create({
        name:request.input('name'),
        description:request.input('description')
      })

      return response.json({
        status: 'success',
        data: category
      })
    } catch (error) {
      return response.status(400).json({
        status:'error',
        message: 'intenta mas tarde'
      })
    }
  }

 
  async show ({ params, request, response, view }) {
    const category = await Category.find(params.id)

    if (!category) {
      return response.status(404).json({status:'error', message:'Categoria no encontrada'})
    }

    return response.json({
      status: 'success',
      data:category
    })
  }


  async update ({ params, request, response }) {
    const category = await Category.find(params.id)

    if ( !category ) {
      return response.status(404).json({status:'error', message:'Categoria no encontrada'}) 
    }
    
    category.name = request.input('name'),
    category.description = request.input('description')

    await category.save()

    return response.status(201).json({
      status: 'success',
      data: category
    })
  }


  async destroy ({ params, request, response }) {
    const category = await Category.find(params.id)

    if (!category) {
      return response.status(404).json({status:'error', message:'Categoria no encontrada'})
    }

    category.delete()

    return response.status(204).json({
      staus:'success',
      data: null
    })
  }
}

module.exports = CategoryController
