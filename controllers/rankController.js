import Rank from "../models/RankModel.js";

const getRanks = async (request, response) => {
    try {
        const ranks = await Rank.find();
        
        response.status(200).json(ranks);
    } catch (error) {
        response.status(500).json({ msg: "Error al obtener los rangos" });
    }
}

const getRankById = async( request, response) => {
    const id = request.params.id;

    try {
        const rank = await Rank.findById(id);
        if (rank) {
            response.status(200).json(rank);
        } else {
            response.status(404).json({ msg: 'No se encontró el ranke' });
        }
    } catch (error) {
        response.status(500).json({ msg: 'Error al obtener el ranke' });
    }
}

const addRank = async(request, response) => {
    const rank = request.body;
    if (!rank.name || !rank.image) {
        return response.status(403).json({ msg: "Faltan parámetros" });
    }
    const doc = new Rank(rank);
    await doc.save();
    response.json({ msg: "Rango creado", data: { id: doc._id, name: doc.name, image: doc.image } });
}

const updateRank = async (request, response) => {
    const id = request.params.id;
    const agent = request.body;

    try {
        const newRank = await Rank.findByIdAndUpdate(id, agent, { new: true });
        if (newRank) {
            response.json({ msg: 'Rango actualizado', data: { newRank } });
        } else {
            response.status(404).json({ msg: 'No se encontró el rango' });
        }
    } catch (error) {
        response.status(500).json({ msg: 'Error al actualizar el rango' });
    }   
}

const deleteRank = async (request, response) => {
    const id = request.params.id;
    try {
        const status = await Rank.findByIdAndDelete(id);
        if (status) {
            response.json({ msg: 'Rango eliminado' });
        } else {
            response.status(404).json({ msg: 'No se encontró el rango' });
        }
    } catch (error) {
        response.status(500).json({ msg: 'Error al eliminar el rango' });
    }
}

export { getRanks, getRankById, addRank, updateRank, deleteRank };