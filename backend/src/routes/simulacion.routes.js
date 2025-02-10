import express from 'express';
const router = express.Router();
import { Simulador } from '../models/Simulador.js';

router.post("/simular", async (req, res) => {
    let sim = new Simulador();
    sim.simular(1, 2);
    res.json(sim.array_a_mostrar);
})

export default router;