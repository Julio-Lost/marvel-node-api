const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/application/routes/index.ts'];

swaggerAutogen(outputFile, endpointsFiles);
