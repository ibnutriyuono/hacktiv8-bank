const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const router = require('./routes')

app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use(express.static(__dirname+ '/public'))

app.use('/', router)

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
}) 