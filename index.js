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
        { name: "jett", Image: "Jett.png" },
        { name: "Phoenix", Image: "Phoenix.png" },
        { name: "Sage", Image: "Sage.png" },
        { name: "Cypher", Image: "Cypher.png" },
        { name: "Sova", Image: "Sova.png" },
        { name: "Killjoy", Image: "Killjoy.png" },
        { name: "Raze", Image: "Raze.png" },
        { name: "Breach", Image: "Breach.png" },
        { name: "Omen", Image: "Omen.png" },
        { name: "Viper", Image: "Viper.png" },
        { name: "Brimstone", Image: "Brimstone.png" },
        { name: "Astra", Image: "Astra.png" },
        { name: "Yoru", Image: "Yoru.png" },
        { name: "KAY/O", Image: "KAY/O.png" },
        { name: "Chamber", Image: "Chamber.png" },
        { name: "Neon", Image: "Neon.png" },
        { name: "Skye", Image: "Skye.png" },
        { name: "Harbor", Image: "Harbor.png" },
        { name: "Fade", Image: "Fade.png" },
        { name: "Gekko", Image: "Gekko.png" },
        { name: "Deadlock", Image: "Deadlock.png" },
        { name: "Tejo", Image: "Tejo.png" },
        { name: "WayLay", Image: "WayLay.png" },
        { name: "Vise", Image: "Vise.png" },
        { name: "Clove", Image: "Clove.png" },
        { name: "Iso", Image: "Iso.png" },
        { name: "DeadLock", Image: "DeadLock.png" }
        
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