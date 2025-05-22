import express from 'express';
import { getAgents, getAgentById, addAgent, updateAgent, deleteAgent } from '../controllers/agentController.js';

const router = express.Router();

// Rutas para los agentes
router.get('/', getAgents);
router.get('/:id', getAgentById);
router.post('/', addAgent);
router.put('/:id', updateAgent);
router.delete('/:id', deleteAgent);

export default router;