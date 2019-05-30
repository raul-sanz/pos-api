'use strict'
const User = use('App/Models/User')
const Company = use('App/Models/Company')

class AuthController {
  async login({request, response, auth}){
    const email = request.input('email')
    console.log(email);
    try {
      const token = await auth.attempt(
        request.input('email'),
        request.input('password')
      )

      let user = await User.query().where('email', email).with('company').with('role').fetch()
      return response.json({
        status: 'success',
        token,
        user: user
      })
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        message:'correo o contraseña invalidos'
      })
    }
  }

  async register ({ request, response }) {
    console.log(request);
    try {
      const company = await Company.create({
        name:request.input('name'),
        address:request.input('address'),
        phone:request.input('phone'),
        business_name:request.input('business_name')
      })

      const user = await User.create({
        email:request.input('email'),
        username:`${request.input('first_name')}${request.input('last_name')}_${Date.now()}`,
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
  }
}

module.exports = AuthController
