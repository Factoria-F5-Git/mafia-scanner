import mafiososData from './mafiosos.json'

export class MafiososRepository {
    ultimaId = 4;
    mafiosos = mafiososData;

    obtenerMafiosos() {
        return this.mafiosos;
    }

    obtenerMafiosoPorId(id){
        return this.mafiosos.find(mafioso => mafioso.id == id);
    }

    crear(nombre, estado, edad, descripcion){
        this.mafiosos.push()

    }
}
