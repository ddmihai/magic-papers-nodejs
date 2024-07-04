"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_create_1 = __importDefault(require("../controllers/users/user.create"));
const userRouter = (0, express_1.Router)();
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const user_validator_1 = require("../middleware/user.validator");
const user_login_1 = require("../controllers/users/user.login");
const users_get_1 = __importDefault(require("../controllers/users/users.get"));
// Rate limiter
const rateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 10, // limit each IP to 5 sign-up requests per windowMs
    message: 'Too many accounts created from this IP, please try again after an hour',
    headers: true, // Send rate limit header information
});
//Added swagger documentation
/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: User signup account
 *     description: This endpoint is used to create a new user account. The functionality is protected by a rate limiter and a validator.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's name. Name must not include special characters or numbers
 *               phone:
 *                 type: string
 *                 description: User's phone number. UK
 *               email:
 *                 type: string
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password. Must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number
 *     responses:
 *       422:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                         description: The name of the field that failed validation
 *                       message:
 *                         type: string
 *                         description: The validation error message
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 */
userRouter.post('/signup', rateLimiter, user_validator_1.validateUser, user_create_1.default);
// Login user
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Logs in a user
 *     description: Authenticates a user with their email and password. If the credentials are valid and the user is not banned, a session is created.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid credentials or account suspended
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid credentials"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid credentials"
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The user's unique identifier.
 *         name:
 *           type: string
 *           description: The user's full name.
 *         email:
 *           type: string
 *           description: The user's email address.
 *         role:
 *           type: string
 *           description: The user's role within the system.
 */
userRouter.post('/login', rateLimiter, user_login_1.userLogin);
// get all users
/**
 * @swagger
 * /users/get-all:
 *   get:
 *     summary: Retrieves all users
 *     description: Returns a list of all users in the system. This endpoint is intended for administrative use only.
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The user's unique identifier.
 *         name:
 *           type: string
 *           description: The user's full name.
 *         email:
 *           type: string
 *           description: The user's email address.
 *         role:
 *           type: string
 *           description: The user's role within the system.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the user was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the user was last updated.
 *         avatar:
 *           type: string
 *           nullable: true
 *           description: The URL to the user's profile picture.
 */
userRouter.get('/get-all', users_get_1.default);
exports.default = userRouter;
