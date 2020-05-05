const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const ObjectId = require('mongodb').ObjectID
const MongoClient = require('mongodb').MongoClient
const uri = "mongodb://patrickisidoro:nuzor1539@ds133279.mlab.com:33279/crud-nodejs";

app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect(uri,{useUnifiedTopology: true, useUnifiedTopology: true}, (err, client) => {
  if (err) return console.log(err)
  db = client.db('crud-nodejs') 

  app.listen(3000, () => {
    console.log('Server running on port 3000')
  })
})


app.set('view engine', 'ejs')

app.route('/')
.get((req, res) => {
  db.collection('data').find().toArray((err, results) => {
    if (err) return console.log(err)
    res.render('show.ejs', { data: results })
  })
})

.post((req, res) => {
  db.collection('data').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('Salvo no Banco de Dados')
    res.redirect('/')
  })
}) 

app.route('/edit/:id')
.get((req, res) => {
  var id = req.params.id

  db.collection('data').find(ObjectId(id)).toArray((err, result) => {
    if (err) return res.send(err)
    res.render('edit.ejs', { data: result })
  })
})

.post((req, res) => {
  var id = req.params.id
  var name = req.body.name
  var surname = req.body.surname
  var rg = req.body.rg
  var cpf = req.body.cpf
  var celular = req.body.celular
  var email = req.body.email
  var endereco = req.body.endereco
  var cidade = req.body.cidade
  var estado = req.body.estado
  var pais = req.body.pais
  

  db.collection('data').updateOne({_id: ObjectId(id)}, {
    $set: {
      name: name,
      surname: surname,
      rg: rg,
      cpf: cpf,
      celular: celular,
      email: email,
      endereco: endereco,
      cidade: cidade,
      estado: estado,
      pais: pais
    }
  }, (err, result) => {
    if (err) return res.send(err)
    res.redirect('/')
    console.log('Atualizado no Banco de Dados')
  })
})

app.route('/delete/:id')
.get((req, res) => {
  var id = req.params.id

  db.collection('data').deleteOne({_id: ObjectId(id)}, (err, result) => {
    if (err) return res.send(500, err)
    console.log('Deletado do Banco de Dados!')
    res.redirect('/')
  })
})