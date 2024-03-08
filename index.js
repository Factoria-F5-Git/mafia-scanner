import express from 'express';
import { MafiososRepository } from './mafiososRepository.js';
import { PrisionesRepository } from './prisionesRepository.js';

const app = express()
app.use(express.json())

const mafiososRepository = new MafiososRepository();
const prisionesRepository = new PrisionesRepository();

app.get('/mafiosos', function (req, res) {
    res.json({ mafiosos: mafiososRepository.obtenerTodos() })
})

app.get('/mafiosos/:id', function (req, res) {
    res.send(mafiososRepository.obtenerPorId(req.params.id))
})

app.post('/mafiosos', function (req, res) {
    res.status(201).json(mafiososRepository.crear(req.body.nombre, req.body.estado, req.body.edad, req.body.descripcion))
})

app.put('/mafiosos/:id', function (req, res) {
    const mafioso = mafiososRepository.obtenerPorId(req.params.id)
    const nombre = req.body.nombre || mafioso.nombre
    const estado = req.body.estado || mafioso.estado
    const edad = req.body.edad || mafioso.edad
    const descripcion = req.body.descripcion || mafioso.descripcion
    res.send(mafiososRepository.actualizar(req.params.id, nombre, estado, edad, descripcion))
})

app.delete('/mafiosos/:id', function (req, res) {
    mafiososRepository.eliminarPorId(req.params.id)
    res.status(202).json({})
})

app.get('/prisiones', function (req, res) {
    res.json({ prisiones: prisionesRepository.obtenerTodos() })
})

app.post('/prisiones/encarcelar/', function (req, res) {
    res.send(prisionesRepository.encarcelar(req.query.prision, req.query.mafioso))
})

app.listen(3000, () => {
    console.log("Mafia scanner: Buenos dias agente de la ley.")
    console.log("Mafia scanner: A que mafioso atraparemos hoy?")
})

export const server = app;