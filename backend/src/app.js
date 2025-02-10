import express from "express";
import cors from "cors";

import router from "./routes/simulacion.routes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/final", router);

export default app;