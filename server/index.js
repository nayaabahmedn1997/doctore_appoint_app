import express from 'express';
import userRouter from './routes/userRoutes.js';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';



//Cors options
const corsOptions = {
    origin: '*', // your frontend domain
  credentials: true, // allow cookies/auth headers
}


export let app = express();
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing
app.use(cors(corsOptions));
// log to console
app.use(morgan('dev'));

//Documentation middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Auth router
app.use("/auth", userRouter);


