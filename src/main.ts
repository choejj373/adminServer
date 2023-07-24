import 'dotenv/config';
import express from 'express';
import path from 'path';

import { CreateDBPool } from './config/db.js';
import { ConnectRedis } from './config/redis.js';
import { router } from './routes/index.js';

export const __dirname = path.resolve();


const app = express();

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, './src/views'));

app.use( express.static(path.join(__dirname, '/src/public')));
app.use( express.json());
app.use( express.urlencoded({extended:true}));

app.use('/', router );

const PORT = process.env.PORT || 4000;

CreateDBPool();
ConnectRedis();

app.listen(PORT, () =>{
    console.log("서버 가동 : ", PORT);
});