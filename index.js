import express from 'express';
import { MafiososRepository } from './mafiososRepository.js';
import { PrisionesRepository } from './prisionesRepository.js';

const app = express()
app.use(express.json())

const mafiososRepository = new MafiososRepository();
const prisionesRepository = new PrisionesRepository();


/*
    Code here
*/

app.listen(3000, () => {
    console.log("Mafia scanner: Buenos dias agente de la ley.")
    console.log("Mafia scanner: A que mafioso atraparemos hoy?")
})