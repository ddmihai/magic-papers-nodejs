"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerOptions = void 0;
exports.swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Magic paper API',
            version: '1.0.0',
            description: 'Ecommenrce book selling API',
        },
        tags: [
            {
                name: 'User',
                description: 'User routes and operations',
            },
        ],
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local server',
            },
        ],
    },
    apis: ['./src/routes/*.ts'], // Path to the API docs
};
