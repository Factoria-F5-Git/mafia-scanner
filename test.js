import { server } from './index.js';
import supertest from 'supertest';
import mafiososData from './mafiosos.json'
import prisionesData from './prisiones.json'
const requestWithSupertest = supertest(server);

// test 0 - GET test endpoint devuelve 404
// test 1 - GET mafiosos devuelve la lista de mafiosos
// test 2 - GET mafiosos:id devuelve un mafioso en particular
// test 3 - POST mafiosos un nuevo mafioso, devuelve el mafioso añadido
// test 4 - PUT mafiosos modifica un mafioso devuelve el id
// test 5 - DELETE mafiosos elimina el mafioso con el id de parametro en la url
// test 6 - GET prisiones devuelve toda la lista de prisiones
// test 7 - POST prisiones encarcelar coge una carcel y un mafioso y devuelve la carcel y la lista de mafiosos que estan en la carcel
// test 8 (deberes) - DELETE mafiosos no elimina el mafioso si el id del mafioso no existe

describe('Mafiosos and prisiones endpoint', () => {

    it('GET test endpoint devuelve 404', async () => {
        const res = await requestWithSupertest.get('/test');
        expect(res.status).toEqual(404);
    })

    it('GET devuelve la lista de mafiosos', async () => {
        const res = await requestWithSupertest.get('/mafiosos');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toHaveProperty('mafiosos')
        expect(res.body).toEqual({ mafiosos: mafiososData })
    });

    it('GET :id devuelve un mafioso en particular', async () => {
        const res = await requestWithSupertest.get('/mafiosos/3');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toEqual(mafiososData[2])
    });

    it('POST crea un nuevo mafioso y devuelve el mafioso añadido', async () => {
        const nuevoMafioso = { nombre: "macaco", estado: "Busca y captura", edad: 32, descripcion: "Siempre lleva una gorra negra" };
        const res = await requestWithSupertest.post('/mafiosos')
            .send(nuevoMafioso)
        expect(res.status).toEqual(201);
        expect(res.body).toEqual({ id: 5, ...nuevoMafioso })
    })

    it('PUT modifica un mafioso y devuelve el id', async () => {
        const actualizarMafioso = { estado: "Busca y captura" }
        const res = await requestWithSupertest.put('/mafiosos/3').send(actualizarMafioso)
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({
            "id": 3,
            "nombre": "Jonny Pepperonni",
            "estado": "Busca y captura",
            "edad": 37,
            "descripcion": "Líder de la mafia del chorizo aunque se rumorea que le gusta mas la mortadela."
        })
    })

    it('DELETE elimina el mafioso con el id de parametro en la url', async () => {
        const res = await requestWithSupertest.delete(`/mafiosos/3`)
        expect(res.status).toEqual(202)
    })

    it('GET prisiones devuelve toda la lista de prisiones', async () => {
        const res = await requestWithSupertest.get(`/prisiones`)
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toHaveProperty('prisiones')
        expect(res.body).toEqual({ prisiones: prisionesData })
    })

    it('POST prisiones encarcelar coge una carcel y un mafioso y devuelve la carcel y la lista de mafiosos que estan en la carcel', async () => {
        const res = await requestWithSupertest.post('/prisiones/encarcelar/?mafioso=2&prision=1')
            .send()
        expect(res.status).toEqual(200);
        expect(res.body).toEqual([{
            "id": 1,
            "prisioneros": [2]
        }, {
            "id": 2,
            "prisioneros": [
                3
            ]
        },
        {
            "id": 3,
            "prisioneros": []
        }])
    })
});