const express = require('express')
const path = require('path')
const {v4} = require('uuid')
const app = express()

let CONTACTS = [
    {id: v4(), name:'Damir', value:'+ 996-778-24-64-94', marked:false},
    {id: v4(), name:'Asyl', value:'+996-505-00-00-00', marked:false}
]
app.use(express.json())
// GET
app.get('/api/contacts',(req,res) => {
     setTimeout( () => {
       res.status(200).json(CONTACTS)
     },1000)
})

//POST
app.post('/api/contacts', (req,res) => {
  const contact = {...req.body, id: v4(), marked:false}
  CONTACTS.push(contact)
  res.status(201).json(contact)
})


//DELETE
app.delete('/api/contacts/:id', (req,res) => {
  CONTACTS = CONTACTS.filter(c => c.id !== req.params.id)
  res.status(200).json({message:'The contact was deleted'})
})

app.put('/api/contacts/:id', (req,res) =>{
  const idx = CONTACTS.findIndex(c=> c.id === req.params.id)
  CONTACTS[idx] = req.body
  res.json(CONTACTS[idx])
})


app.use(express.static(path.resolve(__dirname,'client')));
app.use(function(req, res, next) {
     res.sendFile(path.resolve(__dirname,'client','index.html'))
})


app.listen(3000, () => console.log("Server has been started on port 3000..."))