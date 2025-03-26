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
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            email: { type: "string", example: "user@example.com" },
            password: { type: "string", example: "hashedpassword" },
            resetPasswordToken: { type: "string", nullable: true },
            resetPasswordSentAt: {
              type: "string",
              format: "date-time",
              nullable: true,
            },
            rememberCreatedAt: {
              type: "string",
              format: "date-time",
              nullable: true,
            },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Store: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Best Buy" },
            address: { type: "string", example: "123 Main St" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Category: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Electronics" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Product: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Laptop" },
            description: {
              type: "string",
              example: "A powerful laptop",
              nullable: true,
            },
            price: { type: "number", format: "decimal", example: 999.99 },
            storeId: { type: "integer", example: 1 },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        ProductCategory: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            productId: { type: "integer", example: 1 },
            categoryId: { type: "integer", example: 1 },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

const swaggerSpec = swaggerJsDoc(options);

export { swaggerUi, swaggerSpec };
