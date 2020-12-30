const router = require('express').Router()

const customerRoutes = require('./customerRoutes')

router.get('/', (req, res) => {
  res.send('enter')
})

router.use('/customers', customerRoutes)

module.exports = router