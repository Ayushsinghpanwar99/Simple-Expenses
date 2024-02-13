const express = require('express')
var bodyParser = require('body-parser')
const mongoose = require('mongoose')
// import connetivity from "./model/connetivity.js"
// const connetivity = require("./model/connetivity") 
const app = express()
const port = 3000 
// import cors from "cors"
// const cors = require('cors')
// const dotenv = require('dotenv')
// import dotenv from "dotenv"
// dotenv.config()
// app.use(cors())



mongoose.connect('mongodb://127.0.0.1:27017/ExpenseData')
// const DATABASE_URL = process.env.connetivity
// connetivity(DATABASE_URL)
// const port = process.env.PORT || 3000

.then(()=>{
  console.log("Database connected")
}).catch(()=>{
  console.log("Database not connect")
})

const User = require("./model/user") 
 
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'hbs');
app.set('views', 'views')
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/', (req, res) => {
  async function show() {
    let data = await User.find();
    res.render('admin', { 'data': data })
  }
  show()
})


app.get('/admin', (req,res)=>{
  res.render('admin')
})

app.post('/admin', (req, res) => {
  let data = {
    type:req.body.type,
    addfriend:req.body.addfriend,
    name:req.body.name,
    date:req.body.date,
    currency:req.body.currency,
    amount:req.body.amount
  }
  let d = new User(data);
  d.save()
  res.redirect('/')
})


app.post('/admin/:type', (req, res) => {
  let type = req.params.type;
  async function del() {
    let r = await User.findOneAndDelete({ type: type })
    res.redirect('/')
  }
  del()
})


app.post('', (req, res) => { 
  async function upd() {
    let id= req.body.id
    let type = req.body.type 
    let addfriend = req.body.addfriend
    let name = req.body.name
    let date = req.body.date
    let currency = req.body.currency
    let amount = req.body.amount
    const r = await User.findOneAndUpdate({_id:id}, {
      $set: {
        type:type,
        addfriend:addfriend,
        name:name,
        date:date,
        currency:currency,
        amount:amount
      }
    })
    let data = await User.find();
    res.render('admin', { 'data': data })
  }
  upd()
})
