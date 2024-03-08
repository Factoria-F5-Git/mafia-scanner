import express from 'express';
import { MafiososRepository } from './mafiososRepository';

const app = express()
app.use(express.json())

const mafiososRepository = new MafiososRepository();

app.get('/', function (req, res) {
    res.send("Mafia scanner: Buenos dias agente de la ley, a que mafioso atraparemos hoy?")
})

app.get('/mafiosos', function(req, res){
    const mafiosos = mafiososRepository.obtenerMafiosos()
    res.json(mafiosos);
})

app.get('/mafiosos/:id', function(req, res){
    res.send(mafiososRepository.obtenerMafiosoPorId(req.params.id));
})

app.post('/mafiosos', function(req, res){
    res.status(201).json()
})

app.listen(3000, () => {
    console.log("Mafia scanner: Connected to port 3000")
})

export const server = app;
