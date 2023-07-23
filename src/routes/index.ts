import express from 'express';
import { main } from './mainCtrl.js'

export const router = express.Router();

router.get('/', main.home )