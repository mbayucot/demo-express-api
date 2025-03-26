import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Demo Express API",
      version: "1.0.0",
      description: "API documentation for the Demo Express project",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"], // adjust if needed
};

const swaggerSpec = swaggerJsDoc(options);

export { swaggerUi, swaggerSpec };
