'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with companies
 */
const fs = require('fs-extra')
const Company = use('App/Models/Company')

//const User = use('App/Models/User')

class CompanyController {
  async index ({ request, response, view }) {
    const companies = await Company.all()

    return response.json({
      status: 'succes',
      data: companies
    })
  }


 /*  async store ({ request, response }) {
    try {
      const company = await Company.create({
        name:request.input('name'),
        address:request.input('address'),
        phone:request.input('phone'),
        business_name:request.input('business_name')
      })

      const user = await User.create({
        email:request.input('email'),
        username:request.input('username'),
        password:request.input('password'),
        role_id:1,
        first_name:request.input('first_name'),
        last_name:request.input('last_name'),
        age:request.input('age'),
        phone:request.input('user_phone'),
        address:company.address,
        company_id:company.id
      })

      return response.json({
        status: 'success',
        company,
        user
      })
    } catch (error) {
      return response.status(400).json({
        status:'error',
        message: 'intenta mas tarde'
      })
    }
  } */

 
  async show ({ params, request, response, view }) {
    const company = await Company.find(params.id)

    if (!company) {
      return response.status(404).json({status:'error', message:'Categoria no encontrada'})
    }

    return response.json({
      status: 'success',
      data:company
    })
  }


  async update ({ params, request, response }) {
    const company = await Company.find(params.id)

    if ( !company ) {
      return response.status(404).json({status:'error', message:'Categoria no encontrada'}) 
    }
    
    company.name = request.input('name'),
    company.address = request.input('address'),
    company.phone = request.input('phone'),
    company.business_name = request.input('business_name')
    company.iva = request.input('iva')
    company.logo = request.input('logo')

    await company.save()

    return response.status(201).json({
      status: 'success',
      data: company
    })
  }

  async logo ({ params, request, response, auth }) {
    /*  const company = await Company.find(params.id)*/

    /* if ( !company ) {
      return response.status(404).json({status:'error', message:'Categoria no encontrada'}) 
    } */
    const user = await auth.getUser()
    const profilePic = request.file('profile_pic', {
      types: ['image'],
      size: '3mb'
    })
      // read binary data
      //let bitmap = fs.readFile(`${profilePic.tmpPath}`);
      // convert binary data to base64 encoded string
      
      
    let imageAsBase64 = fs.readFileSync(`${profilePic.tmpPath}`, 'base64');
    
    const company = await Company.find(user.company_id)
    
    company.logo = `data:image/jpeg;base64,${imageAsBase64}`

    await company.save()


    return response.status(201).json({
      status: 'success',
      data: company
    }) 
  }

  async iva ({ params, request, response, auth }) {
    
    const user = await auth.getUser()
    const company = await Company.find(user.company_id)
    
    company.iva = request.input('iva')

    await company.save()


    return response.status(201).json({
      status: 'success',
      data: company
    }) 
  }


  async destroy ({ params, request, response }) {
    const company = await Company.find(params.id)

    if (!company) {
      return response.status(404).json({status:'error', message:'Categoria no encontrada'})
    }

    company.delete()

    return response.status(204).json({
      staus:'success',
      data: null
    })
  }
}

module.exports = CompanyController
