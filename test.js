import { server } from './index.js';
import supertest from 'supertest';
import mafiososData from './mafiosos.json'
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

    it('GET mafiosos devuelve la lista de mafiosos', async () => {
        const res = await requestWithSupertest.get('/mafiosos');
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(mafiososData);
    })

    it('GET mafiosos:id devuelve un mafioso en particular', async () => {
        const res = await requestWithSupertest.get('/mafiosos/2');
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(mafiososData[1])
    })

    it('POST mafiosos un nuevo mafioso, devuelve el mafioso añadido', async () => {
        const nuevoMafioso = {"nombre": "Al Capone", "estado": "Muerto","edad": 43, "descripcion": "Mafioso americano"}
        const res = await requestWithSupertest.post('/mafiosos').send(nuevoMafioso);
        expect(res.status).toEqual(201);
        expect(res.body).toEqual({id: 4, ...nuevoMafioso});
    })
});