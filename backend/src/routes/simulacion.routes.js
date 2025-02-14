import express from 'express';
const router = express.Router();
import { Simulador } from '../models/Simulador.js';

router.post("/simular", async (req, res) => {
    const { cant_iteraciones_a_mostrar, dia_inicio_muestra, hora_inicio_muestra } = req.body

    let sim = new Simulador();
    sim.simular(cant_iteraciones_a_mostrar, dia_inicio_muestra, hora_inicio_muestra);
    res.json(sim.array_a_mostrar);
})

export default router;