
import { Request, Response } from 'express';
import { ConnectRedis } from '../config/redis.js'
import { GetConnection, ReleaseConnection } from "../config/db.js"
// import { RedisCommandArgument } from 'redis'

export const rank = {
    // pipeline& rdb에서 가져올때도 나누어서 가져와야 한다.
    initUserRealtimeRank : async ( req:Request, res:Response)=>{
        const connDB = await GetConnection();
        const redisCli = await ConnectRedis();
        
        try{

            const [rows]:any = await connDB.query("SELECT * FROM user;" );

            rows.forEach((user:any) => {
                redisCli.zAdd( req.body.key, user.money, user.name );    
            });

            res.json( {msg:"ok"} );
        }catch( err ){
            console.log( err );
            res.status(601).json( {msg:err} );
        }finally{
            redisCli.quit();
            ReleaseConnection( connDB );
        }
        
    },

    getUserRankAll : async  ( req:Request, res:Response)=> {
        const redisCli = await ConnectRedis();

        try{

            const count = await redisCli.zCard( req.body.key );
            const rows = await redisCli.zRangeWithScores( req.body.key, req.body.startPos, req.body.endPos, { REV:true } );

            res.json( {msg:"ok", zCard:count, zRange:rows} );
        }catch( err ){
            console.log( err );
            res.status(602).json( {msg:err} );
        }finally{
            redisCli.quit();
        }
    },

    //multi
    getUserRank : async  ( req:Request, res:Response)=> {
        const redisCli = await ConnectRedis();

        try{
            const rank = await redisCli.ZREVRANK( req.body.key, req.body.name );
            const score = await redisCli.zScore( req.body.key, req.body.name );

            res.json( {msg:"ok", zRank:rank, zScore:score} );

        }catch( err ){
            console.log( err );
            res.status(603).json( {msg:err} );
        }finally{
            redisCli.quit();
        }
    },
}