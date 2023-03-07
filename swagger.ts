
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'CSE341',
        description: 'Project API Doc'
    },
    host: process.env.SERVER_HOST,
    schemes: [process.env.HTTP_SCHEMA]
};

const outputFile = './swagger.json';
const endpointsFiles = ['./index.ts'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);