import express from 'express';
import { getUserData, loginUser, registerUser } from '../controllers/userController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';



const userRouter = express.Router();



/**
 * @swagger
 * /auth/loginUser:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: strongpassword123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: User doesn't exists or invalid credentials
 *       500:
 *         description: Server error
 */
userRouter.post('/loginUser', loginUser);




/**
 * @swagger
 * /auth/registerUser:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: strongpassword123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error or user already exists
 *       500:
 *         description: Server error
 */
userRouter.post('/registerUser', registerUser);
/**
 * @swagger
 * /auth/get-user-data:
 *   get:
 *     summary: Get user by ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters: none
 *     responses:
 *       200:
 *         description: User object
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
userRouter.get('/get-user-data',authenticateToken , getUserData);

export default userRouter;