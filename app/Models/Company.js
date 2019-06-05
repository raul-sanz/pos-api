'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Company extends Model {
  user () {
    return this.hasMany('App/Models/User')
  }

  product () {
    return this.hasMany('App/Models/Product')
  }

  sale () {
    return this.hasMany('App/Models/Sale')
  }

  provider () {
    return this.hasMany('App/Models/Provider')
  }
}

module.exports = Company
