import express from 'express';
import userRouter from './routes/userRoutes.js';


export let app = express();
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing
app.use("/users", userRouter);


