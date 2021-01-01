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
    let errors
    if(req.query.err){
      errors = req.query.err.split(',')
    }
    res.render('./pages/post-form-register-customer', {
      errors
    })
  }
  static handleRegister(req, res){
    // res.send(req.body)
    Customer.create(req.body)
      .then(_ => {
        res.redirect('/customers')
      })
      .catch(err => {
        let errorsArray = []
        err.errors.forEach(el => {
          errorsArray.push(el.message)
        })
        res.redirect(`/customers/register/?err=${errorsArray}`)
      })
  }
  static renderEditProfileForm(req, res){
    let errors
    if(req.query.err){
      errors = req.query.err.split(',')
    }
    let id = +req.params.idCustomer
    Customer.findAll({
      where: {
        id
      }
    })
      .then(data => {
        res.render('./pages/edit-form-customer',{
          data,
          errors
        })
      })
      .catch(err => {
        res.send(err)
      })
  }
  static handleEditProfileForm(req, res){
    let id = req.params.idCustomer
    Customer.findOne({
      where:{
        id,
        identityNumber: req.body.identityNumber
      }
    })
      .then(data => {
        // res.send(data)
        if(data){
          delete req.body.identityNumber
          return Customer.update(req.body, {
            where:{
              id
            }
          })
        }else{
          return Customer.update(req.body, {
            where:{
              id
            }
          })
        }
      })
      .then(_ => {
        res.redirect('/customers')
      })
      .catch(err => {
        let errorsArray = []
        err.errors.forEach(el => {
          errorsArray.push(el.message)
        })
        res.redirect(`/customers/${id}/editProfile/?err=${errorsArray}`)
      })
  }
  static getAccountById(req, res){
    let errors
    if(req.query.err){
      errors = req.query.err.split(',')
    }
    let id = +req.params.idCustomer
    Customer.findAll({
      where: {
        id
      },
      include: [ Account ]
    })
      .then(data => {
        res.render('./pages/get-accounts', {
          data,
          errors
        })
      })
      .catch(err => {
        res.send(err)
      })
  }
  static handleAddNewAccount(req, res){
    let id = req.params.idCustomer
    req.body.CustomerId = id
    Account.create(req.body)
      .then(_ => res.redirect(`/customers/${id}/accounts`))
      .catch(err => {
        let errorsArray = []
        err.errors.forEach(el => {
          errorsArray.push(el.message)
        })
        res.redirect(`/customers/${id}/accounts/?err=${errorsArray}`)
      })
  }
  static renderTranserForm(req, res){
    res.send('transfer form')
  }
  static handleTransfer(req, res){
    res.send(req.body)
  }
}

module.exports = CustomerController