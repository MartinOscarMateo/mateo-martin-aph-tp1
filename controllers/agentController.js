import Agent from "../models/AgentModel.js";

const getAgents = async (request, response) => {
    try {
        const filter = {};
        if (request.query.rol) {
            filter.rol = request.query.rol;
        }
        const agents = await Agent.find(filter);
        if (agents.length === 0) {
            return response.status(404).json({ msg: "No se encontraron agentes con ese rol." });
        }
        response.status(200).json(agents);
    } catch (error) {
        response.status(500).json({ msg: "Error al obtener los agentes" });
    }
}

const getAgentById = async( request, response) => {
    const id = request.params.id;

    try {
        const agent = await Agent.findById(id);
        if (agent) {
            response.status(200).json(agent);
        } else {
            response.status(404).json({ msg: 'No se encontró el agente' });
        }
    } catch (error) {
        response.status(500).json({ msg: 'Error al obtener el agente' });
    }
}

const addAgent = async(request, response) => {
    const agent = request.body;
    if (!agent.name || !agent.image || !agent.rol) {
        return response.status(403).json({ msg: "Faltan parámetros" });
    }
    const doc = new Agent(agent);
    await doc.save();
    response.json({ msg: "Agente creado", data: { id: doc._id, name: doc.name} });
}

const updateAgent = async (request, response) => {
    const id = request.params.id;
    const agent = request.body;

    try {
        const newAgent = await Agent.findByIdAndUpdate(id, agent, { new: true });
        if (newAgent) {
            response.json({ msg: 'Agente actualizado', data: { newAgent } });
        } else {
            response.status(404).json({ msg: 'No se encontró el agente' });
        }
    } catch (error) {
        response.status(500).json({ msg: 'Error al actualizar el agente' });
    }   
}

const deleteAgent = async (request, response) => {
    const id = request.params.id;
    try {
        const status = await Agent.findByIdAndDelete(id);
        if (status) {
            response.json({ msg: 'Agente eliminado' });
        } else {
            response.status(404).json({ msg: 'No se encontró el agente' });
        }
    } catch (error) {
        response.status(500).json({ msg: 'Error al eliminar el agente' });
    }
}

export { getAgents, getAgentById, addAgent, updateAgent, deleteAgent };