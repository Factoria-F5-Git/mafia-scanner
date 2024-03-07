import prisionesData from './prisiones.json';

export class PrisionesRepository {
    prisiones = prisionesData

    obtenerTodos() {
        return this.prisiones
    }

    obtenerPorId(id) {
        return this.prisiones.find(prision => prision.id == id);
    }

    encarcelar(idPrision, idMafioso) {
        const prision = this.obtenerPorId(idPrision)
        prision.prisioneros.push(Number(idMafioso));
        return this.prisiones
    }
}
