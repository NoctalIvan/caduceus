const express = require('express')
const app = express()

app.use(express.static('front'));

app.listen(4785, function () {
  console.log('Example app listening on port 4785!')
})
