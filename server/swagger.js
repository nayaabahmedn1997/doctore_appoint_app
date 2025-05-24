// backend/swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Doctor appointment app api',
      version: '1.0.0',
      description: 'API for my Doctor\'s appointment MERN app',
    },
    servers: [
      {
        url: 'http://localhost:5001',
      },
    ],
  },
  apis: ['./routes/*.js'], // route files with JSDoc annotations
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;
