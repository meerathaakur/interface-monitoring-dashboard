import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import dbConfig from './config/db.config.js';
import redisClient from './config/redis.config.js';

import logRoutes from './routes/log.routes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.locals.redisClient = redisClient;

// Routes
app.use('/api', logRoutes);
app.get("/", (req, res) => {
    res.send("API is working...")
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
    await dbConfig()
    console.log(`Server is running on port ${PORT}`);
});