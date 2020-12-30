const router = require('express').Router()

const customerRoutes = require('./customerRoutes')

router.get('/', (req, res) => {
  res.render('./pages/get-index')
})

router.use('/customers', customerRoutes)

module.exports = router