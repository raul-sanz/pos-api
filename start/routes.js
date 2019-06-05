'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('/login', 'AuthController.login')
Route.post('/register', 'AuthController.register')
Route.get('/range/:start/:end', 'SaleController.range').middleware(['auth:jwt'])
Route.get('/filtro/:string', 'ProductController.filtro').middleware(['auth:jwt'])
Route.resource('categories', 'CategoryController').middleware(['auth:jwt'])
Route.resource('products', 'ProductController').middleware(['auth:jwt'])
Route.resource('users', 'UserController').middleware(['auth:jwt'])
Route.resource('companies', 'CompanyController').middleware(['auth:jwt'])
Route.resource('sales', 'SaleController').middleware(['auth:jwt'])
Route.resource('providers', 'ProviderController').middleware(['auth:jwt'])
Route.post('/logo', 'CompanyController.logo').middleware(['auth:jwt'])
Route.post('/iva', 'CompanyController.iva').middleware(['auth:jwt'])