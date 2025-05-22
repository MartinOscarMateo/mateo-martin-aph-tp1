import express from 'express';
import { getRanks, getRankById, addRank, updateRank, deleteRank } from '../controllers/rankController.js';

const router = express.Router();

// Rutas para los agentes
router.get('/', getRanks);
router.get('/:id', getRankById);
router.post('/', addRank);
router.put('/:id', updateRank);
router.delete('/:id', deleteRank);

export default router;