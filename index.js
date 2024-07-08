import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Connection from './database/db.js';
import Router from './routes/routes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// CORS configuration
app.use(cors({
  origin: 'https://recipe-front-five.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  credentials: true
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', Router);

// Establish database connection
Connection();

// Start server
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server is running successfully on PORT ${PORT}`);
});
