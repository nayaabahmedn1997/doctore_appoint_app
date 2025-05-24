//Library module imports
import http from 'http';
import dotenv from 'dotenv';


//Custom module imports
import { app } from './index.js';
import connectDB from './config/db.js';



//dotenv initialization
dotenv.config()

const server = http.createServer(app);
const PORT = process.env.PORT;



//Connect to MongoDB
connectDB();

server.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`)
})