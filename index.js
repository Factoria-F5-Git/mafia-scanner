import express from 'express';

const app = express()
app.use(express.json())

app.get('/', function (req, res) {
    res.send("Mafia scanner: Buenos dias agente de la ley, a que mafioso atraparemos hoy?")
})

app.listen(3000, () => {
    console.log("Mafia scanner: Connected to port 3000")
})

export const server = app;
