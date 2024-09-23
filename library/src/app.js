const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const bookRoutes = require('./Routes/BookRoute');
const memberRoutes = require('./Routes/MemberRoute');
const { createConnection } = require('typeorm'); // Jika menggunakan TypeORM
const config = require('./Config/config'); // Mengimpor konfigurasi
require('reflect-metadata');

const app = express();
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      description: 'API documentation for the library management system',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api', bookRoutes);
app.use('/api', memberRoutes);

// Database connection
createConnection(config.database) // Menggunakan konfigurasi dari config.js
  .then(() => {
    console.log('Connected to the database');
    app.listen(3000, () => console.log('Server running on port 3000'));
  })
  .catch(err => console.log(err));