'use strict'
const User = use('App/Models/User')

class AuthController {
  async login({request, response, auth}){
    const email = request.input('email')
    console.log(email);
    try {
      const token = await auth.attempt(
        request.input('email'),
        request.input('password')
      )

      let user = await User.query().where('email', email).fetch()
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
}

module.exports = AuthController
