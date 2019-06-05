'use strict'
const Provider  = use('App/Models/Provider')
class ProviderController {

  async index ({ request, response, view, auth }) {

    const user = await auth.getUser()

    const products = await Provider.query().where('company_id', user.company_id).fetch()

    return response.json({
      status: 'succes',
      data: products
    })
  }

  async store ({ request, response }) {
    try {
      const provider = await Provider.create({
        company_id:request.input('company_id'),
        name:request.input('name'),
        email:request.input('email'),
        phone:request.input('phone'),
        address:request.input('address')
      })

      return response.json({
        status: 'success',
        data: provider
      })
    } catch (error) {
      console.log(error);
      return response.status(400).json({
        status:'error',
        message: 'intenta mas tarde'
      })
    }
  }
}

module.exports = ProviderController
