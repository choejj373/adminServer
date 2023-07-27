import express from 'express';
import { main } from './mainCtrl.js'
import { rank } from './rankCtrl.js';
import { user } from './userCtrl.js';
import { mail } from './mailCtrl.js';

export const router = express.Router();

router.get('/', main.home );


router.put('/rank/user/init', rank.initUserRealtimeRank);
router.put('/rank/user/all', rank.getUserRankAll );
router.put('/rank/user/search', rank.getUserRank );

// router.get('/rank/user', rank.getUserRank );
router.delete('/rank/user', rank.deleteUserRank );
router.put('/rank/user', rank.updateUserRankScore );


router.get('/user/:name', user.getUserInfo );

router.get('/user/:id/account', user.userGetUserAccountInfo);
router.get('/user/:id/item', user.getUserItemInfo);
router.get('/user/:id/friend', user.getUserFriendInfo);
router.get('/user/guild/:id', user.getUserGuildInfo);
router.get('/user/:id/mail', user.getUserMailInfo);
router.get('/user/:id/quest', user.getUserQuestInfo);
router.get('/user/:id/restrict', user.getUserResctrictInfo);


router.get('/mail/admin', mail.getMailsSentFromAdmin);
router.get('/mail/:id/items', mail.getMailAttachedItems), 
router.post('/mail', mail.sendMail);
