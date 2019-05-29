'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnToSalesSchema extends Schema {
  up () {
    this.table('sales', (table) => {
      table.string('order')
    })
  }

  down () {
    this.table('sales', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddColumnToSalesSchema
