const express = require('express')
const app = express()
require('dotenv').config()

const port = process.env.PORT || 5000;
const mongoDB = require("./db")

const corsOptions = {
  origin: 'https://mern-deploy-frontend.vercel.app/',
  credentials: true,
}
const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

const handler = (req, res) => {
  const d = new Date()
  res.end(d.toString())
}


app.use(express.json());


mongoDB();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api',require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));
app.use('/api',require("./Routes/OrderData"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 
