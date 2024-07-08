import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
import cors from 'cors';
import bodyParser from 'body-parser';
import Connection from './database/db.js';
import Router from './routes/routes.js';
const PORT = 8000||process.env.PORT;
app.use(cors(
  {
    origin: 'https://recipe-front-five.vercel.app', 
    methods: ['GET', 'POST', 'OPTIONS' , 'PUT', 'DELETE'],
    credentials: true 
  }
            ));
app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Router);

Connection();

app.listen(PORT, '127.0.0.1', () => console.log(`Server is running successfully on PORT ${PORT}`));
