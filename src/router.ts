import express from 'express';
import signInController from './controllers/signInController';
import encryptController from './controllers/encryptController';
import generateKeyPairController from './controllers/generateKeyPairController';
import authController from './controllers/authController';

const router = express.Router();

router.post('/sign-in', signInController);
router.post('/generate-key-pair', authController, generateKeyPairController);
router.post('/encrypt', authController, encryptController);

export default router;
