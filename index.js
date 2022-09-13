import express from 'express';
import bodyParser from 'body-parser';
import { MafiososDB } from './mafiososDB.js';
import { PrisionesDB } from './prisionesDB.js';


const app = express()
const mafiososDB = new MafiososDB();
const prisionesDB = new PrisionesDB();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/mafiosos', function (req, res) {
  res.send(mafiososDB.getAll())
})

app.get('/mafiosos/:id', function (req, res) {
  res.send(mafiososDB.getById(req.params.id))
})

app.post('/mafiosos', function (req, res) {
  res.send(mafiososDB.create(req.body.nombre, req.body.estado, req.body.edad, req.body.descripcion))
})

app.put('/mafiosos/:id', function (req, res) {
  res.send(mafiososDB.update(req.params.id, req.body.nombre, req.body.estado, req.body.edad, req.body.descripcion))
})

app.delete('/mafiosos/:id', function (req, res) {
  res.send(mafiososDB.deleteById(req.params.id))
})

app.get('/prisiones', function (req, res) {
  res.send(prisionesDB.getAll())
})

app.get('/prisiones/:id', function (req, res) {
  res.send(prisionesDB.getById(req.params.id))
})

app.post('/prisiones/:id/encarcelar', function (req, res) {
  res.send(prisionesDB.imprision(req.params.id, req.body.id))
})

app.get('/prisiones/:id/prisioneros', function (req, res) {
    const prisioneros = prisionesDB
                            .getById(req.params.id)
                            .prisioneros
                            .map(idPrisionero => mafiososDB.getById(idPrisionero))
    res.send(prisioneros);
  })


app.listen(3000, () => {
    console.log("Mafia scanner: Buenos dias agente de la ley.")
    console.log("Mafia scanner: A que mafioso atraparemos hoy?")
})