
import { Request, Response } from 'express';
import { redisCli } from '../config/redis.js'
import { GetConnection, ReleaseConnection } from "../config/db.js"
// import { RedisCommandArgument } from 'redis'

export const rank = {
    initUserRealtimeRank : async ( req:Request, res:Response)=>{
        const connDB = await GetConnection();
        const redisClient = redisCli.v4;
        
        try{
            const [rows]:any = await connDB.query("SELECT * FROM user;" );

            rows.forEach((user:any) => {
                redisClient.zAdd( req.body.key, user.money, user.name );    
            });

            res.json( {msg:"ok"} );
        }catch( err ){
            console.log( err );
            res.status(601).json( {msg:err} );
        }finally{
            ReleaseConnection( connDB );
        }
        
    },

    getUserRankAll : async  ( req:Request, res:Response)=> {
        try{
            const redisClient = redisCli.v4;

            const count = await redisClient.zCard( req.body.key );
            const rows = await redisClient.zRangeWithScores( req.body.key, req.body.startPos, req.body.endPos, { REV:true } );

            console.log( count );
            console.log( rows );
            res.json( {msg:"ok", zCard:count, zRange:rows} );
        }catch( err ){
            console.log( err );
            res.status(602).json( {msg:err} );
        }finally{
        }
    },

    getUserRank : async  ( req:Request, res:Response)=> {
        try{
            console.log( req.body.key );
            console.log( req.body.name );

            const redisClient = redisCli.v4;

            const rank = await redisClient.ZREVRANK( req.body.key, req.body.name );
            const score = await redisClient.zScore( req.body.key, req.body.name );

            res.json( {msg:"ok", zRank:rank, zScore:score} );

        }catch( err ){
            console.log( err );
            res.status(603).json( {msg:err} );
        }finally{

        }
    },
}