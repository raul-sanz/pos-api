'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddCompanyToProductsSchema extends Schema {
  up () {
    this.table('products', (table) => {
      table.integer('company_id').unsigned().references('id').inTable('companies')
    })
  }

  down () {
    this.table('products', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddCompanyToProductsSchema
