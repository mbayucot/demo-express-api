// src/routes/storeRoutes.ts

import { Router } from "express";
import { StoreController } from "../controllers/storeController";
import { storeSchema } from "../validators/storeSchema";
import { validateRequest } from "../middlewares/validateRequest";
import productRoutes from "./productRoutes";

const router = Router();
const storeController = new StoreController();

/**
 * @swagger
 * tags:
 *   name: Stores
 *   description: Store management
 */

/**
 * @swagger
 * /stores:
 *   post:
 *     summary: Create a new store
 *     tags: [Stores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Store'
 *     responses:
 *       201:
 *         description: Store created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Store'
 */
router.post("/", storeSchema, validateRequest, storeController.create);

/**
 * @swagger
 * /stores:
 *   get:
 *     summary: Get all stores
 *     tags: [Stores]
 *     responses:
 *       200:
 *         description: List of stores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Store'
 */
router.get("/", storeController.getAll);

/**
 * @swagger
 * /stores/{id}:
 *   get:
 *     summary: Get store by ID
 *     tags: [Stores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Store found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Store'
 *       404:
 *         description: Store not found
 */
router.get("/:id", storeController.getById);

/**
 * @swagger
 * /stores/{id}:
 *   put:
 *     summary: Update a store
 *     tags: [Stores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Store'
 *     responses:
 *       200:
 *         description: Store updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Store'
 *       404:
 *         description: Store not found
 */
router.put("/:id", storeSchema, validateRequest, storeController.update);

/**
 * @swagger
 * /stores/{id}:
 *   delete:
 *     summary: Delete a store
 *     tags: [Stores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Store deleted
 *       404:
 *         description: Store not found
 */
router.delete("/:id", storeController.delete);

/**
 * @swagger
 * /stores/{storeId}/products:
 *   get:
 *     summary: Get all products in a store
 *     tags: [Stores]
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of products for the given store
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.use("/:storeId/products", productRoutes);

export default router;
