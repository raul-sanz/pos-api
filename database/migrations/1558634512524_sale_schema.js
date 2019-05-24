'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SaleSchema extends Schema {
  up () {
    this.create('sales', (table) => {
      table.increments()
      table.integer('company_id').unsigned().references('id').inTable('companies')
      table.string('subtotal')
      table.string('iva')
      table.string('total')
      table.string('seller')
      table.text('ticket')
      table.text('products','longtext')
      table.timestamps()
    })
  }

  down () {
    this.drop('sales')
  }
}

module.exports = SaleSchema
