'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
    category(){
        return this.belongsTo('App/Models/Category')
      }

      company () {
        return this.belongsTo('App/Models/Company')
      }
}

module.exports = Product
