'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColomnsToProductSchema extends Schema {
  up () {
    this.table('products', (table) => {
      table.string('model')
      table.string('color')
      table.string('brand')
    })
  }

  down () {
    this.table('products', (table) => {
      
    })
  }
}

module.exports = AddColomnsToProductSchema
