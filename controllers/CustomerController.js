const { reset } = require('nodemon')
const { Customer, Account } = require('../models')

class CustomerController {
  static getAllCustomers(req, res){
    Customer.findAll({
      order: [
        ['fullName', 'ASC']
      ],
      include: [ Account ]
    })
      .then(data => {
        res.render('./pages/get-all-customers', {
          data
        })
      })
      .catch(err => {
        res.send(err)
      })
  }
  static renderRegisterForm(req, res){
    res.send('post form')
  }
  static handleRegister(req, res){
    res.send(req.body)
  }
  static renderEditProfileForm(req, res){
    let id = +req.params.idCustomer
    Customer.findAll({
      where: {
        id
      }
    })
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.send(err)
      })
  }
  static handleEditProfileForm(req, res){
    res.send(req.body)
  }
  static getAccountById(req, res){
    let id = +req.params.idCustomer
    Account.findAll({
      where: {
        id
      }
    })
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.send(err)
      })
  }
  static handleAddNewAccount(req, res){
    res.send(req.body)
  }
  static renderTranserForm(req, res){
    res.send('transfer form')
  }
  static handleTransfer(req, res){
    res.send(req.body)
  }
}

module.exports = CustomerController