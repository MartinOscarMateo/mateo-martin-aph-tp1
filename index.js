import express from "express";
import chalk from "chalk";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const dburi = process.env.MONGODB_URI;

const port = process.env.PORT;
const app = express();

import routerAPI from "./routes/index.js"
import User from "./models/UserModel.js";
import Agent from "./models/AgentModel.js";
import Rank from "./models/RankModel.js";

mongoose.connect(dburi);
const db = mongoose.connection;

db.on('error', (error) => { console.error( {error} ) } );
db.once('open', async () => { 
    console.log('Conexion con la Db Correcta')

    // Agregamos Agentes 
    const agentsToAdd = [
        { name: "jett", image: "Jett.png", rol: "Duelista" },
        { name: "Phoenix", image: "Phoenix.png", rol: "Duelista" },
        { name: "Sage", image: "Sage.png", rol: "Centinela" },
        { name: "Cypher", image: "Cypher.png", rol: "Centinela" },
        { name: "Sova", image: "Sova.png", rol: "Iniciador" },
        { name: "Killjoy", image: "Killjoy.png", rol: "Centinela" },
        { name: "Raze", image: "Raze.png", rol: "Duelista" },
        { name: "Breach", image: "Breach.png", rol: "Iniciador" },
        { name: "Omen", image: "Omen.png", rol: "Controllador" },
        { name: "Viper", image: "Viper.png", rol: "Iniciador" },
        { name: "Brimstone", image: "Brimstone.png", rol: "Controllador" },
        { name: "Astra", image: "Astra.png", rol: "Controllador" },
        { name: "Yoru", image: "Yoru.png", rol: "Duelista" },
        { name: "KAY/O", image: "KAY/O.png", rol: "Iniciador" },
        { name: "Chamber", image: "Chamber.png", rol: "Centinela" },
        { name: "Neon", image: "Neon.png", rol: "Duelista" },
        { name: "Skye", image: "Skye.png", rol: "Iniciador" },
        { name: "Harbor", image: "Harbor.png", rol: "Controllador" },
        { name: "Fade", image: "Fade.png", rol: "Iniciador" },
        { name: "Gekko", image: "Gekko.png", rol: "Iniciador" },
        { name: "Deadlock", image: "Deadlock.png", rol: "Centinela" },
        { name: "Tejo", image: "Tejo.png", rol: "Iniciador" },
        { name: "WayLay", image: "WayLay.png", rol: "Duelista" },
        { name: "Vise", image: "Vise.png", rol: "Centinela" },
        { name: "Clove", image: "Clove.png", rol: "Controllador" },
        { name: "Iso", image: "Iso.png", rol: "Duelista" },
        
    ];
    // Evitamos duplicados
    for (const agentData of agentsToAdd) {
        const exists = await Agent.findOne({ name: agentData.name });
        if (!exists) {
            await Agent.create(agentData);
            console.log(`Agente ${agentData.name} insertado!`);
        } else {
            console.log(`Agente ${agentData.name} ya existe, no se inserta.`);
        }
    }

    // Agregamos Rangos
    const ranksToAdd = [
        { name: "Bronce", Image: "Bronce.png" },
        { name: "Plata", Image: "Plata.png" },
        { name: "Oro", Image: "Oro.png" },
        { name: "Platino", Image: "Platino.png" },
        { name: "Diamante", Image: "Diamante.png" },
        { name: "Inmortal", Image: "Inmortal.png" }
    ];

    // Evitamos duplicados
    for (const rankData of ranksToAdd) {
        const exists = await Rank.findOne({ name: rankData.name });
        if (!exists) {
            await Rank.create(rankData);
            console.log(`Rango ${rankData.name} insertado!`);
        } else {
            console.log(`Rango ${rankData.name} ya existe, no se inserta.`);
        }
    }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static('public'));

routerAPI(app);

app.listen( port, () => {
    console.log(   chalk.green(`Servidor Web en el puerto ${port}`) );    
});