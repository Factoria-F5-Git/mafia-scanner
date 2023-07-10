import mafiososData from './mafiosos.json'

export class MafiososRepository {
    ultimaId = 4;
    mafiosos = mafiososData

    crear(nombre, estado, edad, descripcion) {
        this.ultimaId++;
        return this.actualizar(this.ultimaId, nombre, estado, edad, descripcion)
    }

    obtenerTodos() {
        return this.mafiosos
    }

    obtenerPorId(id) {
        return this.mafiosos.find(mafioso => mafioso.id == id);
    }

    actualizar(id, nombre, estado, edad, descripcion) {
        this.eliminarPorId(id);
        id = Number(id)
        this.mafiosos.push({
            id,
            nombre,
            estado,
            edad,
            descripcion
        });
        return this.obtenerPorId(id);
    }

    eliminarPorId(id) {
        this.mafiosos = this.mafiosos.filter(mafioso => {
            return mafioso.id != id;
        })
    }
}
