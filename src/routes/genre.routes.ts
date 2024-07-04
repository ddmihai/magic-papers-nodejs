import { Router } from "express";
import getALlGenre from "../controllers/genre/genre.getAll";
import createGenre from "../controllers/genre/genre.create";
import { checkIfUserIsAdmin } from '../middleware/checkingMiddleware';

const genreRouter = Router();


// Get all genres
/**
 * @swagger
 * /genres/get-all:
 *   get:
 *     summary: Retrieves all genres
 *     description: Returns a list of all genres available in the system.
 *     tags:
 *       - Genres
 *     responses:
 *       200:
 *         description: A list of genres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genre'
 *       400:
 *         description: Bad request or internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bad request"
 * components:
 *   schemas:
 *     Genre:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The genre's unique identifier.
 *         name:
 *           type: string
 *           description: The name of the genre.
 *         description:
 *           type: string
 *           nullable: true
 *           description: A brief description of the genre.
 */
genreRouter.get('/get-all', getALlGenre);



// Create a genre
/**
 * @swagger
 * /genres/create:
 *   post:
 *     summary: Creates a new genre
 *     description: Adds a new genre to the system. Requires the genre's name and an optional description. This endpoint is protected and only accessible by admin users.
 *     tags:
 *       - Genres
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the genre.
 *                 example: "Drama"
 *               description:
 *                 type: string
 *                 nullable: true
 *                 description: A brief description of the genre.
 *     responses:
 *       201:
 *         description: Genre successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       400:
 *         description: Bad request (missing or invalid fields)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Name and description are required fields"
 *       403:
 *         description: Forbidden (not an admin user)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 * components:
 *   schemas:
 *     Genre:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The genre's unique identifier.
 *         name:
 *           type: string
 *           description: The name of the genre.
 *         description:
 *           type: string
 *           nullable: true
 *           description: A brief description of the genre.
 */
genreRouter.post('/create', checkIfUserIsAdmin, createGenre);









export default genreRouter;