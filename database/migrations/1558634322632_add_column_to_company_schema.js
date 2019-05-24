'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnToCompanySchema extends Schema {
  up () {
    this.table('companies', (table) => {
      table.decimal('iva')
      table.text('logo')
    })
  }

  down () {
    this.table('companies', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddColumnToCompanySchema
