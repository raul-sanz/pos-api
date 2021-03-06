'use strict'

const Sale = use('App/Models/Sale')
const moment = require('moment')
const Database = use('Database')

class SaleController {
  async index ({ request, response, view, auth }) {

    const user = await auth.getUser()

    const sales = await Sale.query().where('company_id', user.company_id).fetch()

    return response.json({
      status: 'succes',
      data: sales
    })
  }


  async store ({ request, response }) {
    
    try {
      //const pros = request.input('products')
      
      const sale = await Sale.create({
        company_id:request.input('company_id'),
        subtotal:request.input('subtotal'),
        iva:request.input('iva'),
        total:request.input('total'),
        ticket:request.input('ticket'),
        seller:request.input('seller'),
        products:JSON.stringify(request.input('products')),
        order:request.input('order')
      })

      return response.json({
        status: 'success',
        data: sale
      }) 
    } catch (error) {
      console.log(error);
      return response.status(400).json({
        status:'error',
        message: 'intenta mas tarde'
      })
    }
  }

 
  async show ({ params, request, response, view }) {
    const sale = await Sale.find(params.id)

    if (!sale) {
      return response.status(404).json({status:'error', message:'Saleo no encontrado'})
    }

    return response.json({
      status: 'success',
      data:sale
    })
  }


  async update ({ params, request, response }) {
    const sale = await Sale.find(params.id)

    if ( !sale ) {
      return response.status(404).json({status:'error', message:'Saleo no encontrado'}) 
    }
    
    sale.company_id = request.input('company_id'),
    sale.subtotal = request.input('subtotal'),
    sale.iva = request.input('iva'),
    sale.total = request.input('total'),
    sale.ticket = request.input('ticket'),
    sale.seller = request.input('seller'),
    sale.products = request.input('products')

    await sale.save()

    return response.status(201).json({
      status: 'success',
      data: sale
    })
  }


  async destroy ({ params, request, response }) {
    const sale = await Sale.find(params.id)

    if (!sale) {
      return response.status(404).json({status:'error', message:'Saleo no encontrado'})
    }

    sale.delete()

    return response.status(204).json({
      staus:'success',
      data: null
    })
  }

  async range ({ params, request, response,auth }){
    try {
      const user = await auth.getUser()
      const start = new Date(moment(params.start, 'YYYY-MM-DD', false).format())
      const end = new Date(moment(params.end).add(1, 'days')/*moment(params.end, 'YYYY-MM-DD', false).format()*/)
      const sales = await Database.table('sales').where('company_id',user.company_id).whereBetween('created_at', [start, end])
      let ventas = sales.map(el=>{
        let elemento = el
        let ya = elemento.products.replace(/\\/gi, '')
        elemento.products = JSON.parse(ya)
        return elemento
      })
      return response.status(200).json({
        staus:'success',
        data: ventas
      })
    } catch (error) {
      
    }
  }
}

module.exports = SaleController
