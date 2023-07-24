import express from 'express';
import { main } from './mainCtrl.js'
import { rank } from './rankCtrl.js';

export const router = express.Router();

router.get('/', main.home );


router.put('/rank/user/init', rank.initUserRealtimeRank);
router.put('/rank/user/all', rank.getUserRankAll )
router.put('/rank/user/search', rank.getUserRank );