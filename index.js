const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
  console.log(req.body)
  res.json({
    message: 'welcome',
  })
})

app.post('/', (req, res) => {
  console.log(req.body.a)
  res.json({
    message: 'welcome',
  })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
