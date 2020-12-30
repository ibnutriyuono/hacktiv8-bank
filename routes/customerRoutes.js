const router = require('express').Router()
const CustomerController = require('../controllers/CustomerController')

router.get('/', CustomerController.getAllCustomers)

router.get('/register', CustomerController.renderRegisterForm)

router.post('/register', CustomerController.handleRegister)

router.get('/:idCustomer/editProfile', CustomerController.renderEditProfileForm)

router.post('/:idCustomer/editProfile', CustomerController.handleEditProfileForm)

router.get('/:idCustomer/accounts', CustomerController.getAccountById)

router.post('/:idCustomer/accounts', CustomerController.handleAddNewAccount)

router.get('/:idCustomer/accounts/:idAccount/transfer', CustomerController.renderTranserForm)

router.post('/:idCustomer/accounts/:idAccount/transfer', CustomerController.handleTransfer)

module.exports = router