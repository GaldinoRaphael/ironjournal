import express from "express"
import { handleNewUser } from './registerController';

const router = express.Router();

router.post('/', handleNewUser);

export default router;