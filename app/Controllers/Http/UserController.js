'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
const User = use('App/Models/User')

class UserController {

  async index ({ request, response, view, auth }) {
    const user = await auth.getUser()

    const users = await User.query().where('company_id', user.company_id).with('role').fetch()

    return response.json({
      status: 'succes',
      data: users
    })
  }


  async store ({ request, response }) {
    try {
      const user = await User.create({
        email:request.input('email'),
        username:request.input('username'),
        password:request.input('password'),
        role_id:request.input('role_id'),
        first_name:request.input('first_name'),
        last_name:request.input('last_name'),
        age:request.input('age'),
        phone:request.input('phone'),
        address:request.input('address'),
        company_id:request.input('company_id')
      })

      return response.json({
        status: 'success',
        data: user
      })
    } catch (error) {
      return response.status(400).json({
        status:'error',
        message: 'intenta mas tarde'
      })
    }
  }

 
  async show ({ params, request, response, view }) {
    const user = await User.find(params.id)

    if (!user) {
      return response.status(404).json({status:'error', message:'Usuario no encontrado'})
    }

    return response.json({
      status: 'success',
      data:user
    })
  }


  async update ({ params, request, response }) {
    const user = await User.find(params.id)

    if ( !user ) {
      return response.status(404).json({status:'error', message:'Usuario no encontrado'}) 
    }
    
    user.email = request.input('email'),
    user.username = request.input('username'),
    user.role_id = request.input('role_id'),
    user.first_name = request.input('first_name'),
    user.last_name = request.input('last_name'),
    user.age = request.input('age'),
    user.phone = request.input('phone'),
    user.address = request.input('address')

    await user.save()

    return response.status(201).json({
      status: 'success',
      data: user
    })
  }


  async destroy ({ params, request, response }) {
    const user = await User.find(params.id)

    if (!user) {
      return response.status(404).json({status:'error', message:'Usuario no encontrado'})
    }

    user.delete()

    return response.status(204).json({
      staus:'success',
      data: null
    })
  }
}

module.exports = UserController
