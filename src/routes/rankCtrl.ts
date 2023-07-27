
import { Request, Response } from 'express';
import { ConnectRedis } from '../config/redis.js'
import { GetConnection, ReleaseConnection } from "../config/db.js"

export const rank = {

    //pipeline auto
    initUserRealtimeRank : async ( req:Request, res:Response)=>{
        const connDB = await GetConnection();
        const redisCli = await ConnectRedis();

        try{

            const [result]:any = await connDB.query("SELECT COUNT(*) as cnt FROM user;" );

            await redisCli.UNLINK( req.body.key );
            
            const maxOffset = result[0].cnt;
            const countPerPage = 10;

            for( let offset = 0;  offset < maxOffset ; offset += countPerPage ){

                let [rows]:any = await connDB.query("SELECT * FROM user LIMIT ?, ?;",[ offset , countPerPage] );

                rows.forEach((user:any) => {
                    redisCli.zAdd( req.body.key, { score:user.money, value:user.name } );    
                });
            }

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
    deleteUserRank: async  ( req:Request, res:Response)=> {
        const redisCli = await ConnectRedis();

        try{
            await redisCli.zRem( req.body.key, req.body.name );
            res.json( {msg:"ok"} );

        }catch( err ){
            console.log( err );
            res.status(604).json( {msg:err} );
        }finally{
            redisCli.quit();
        }
    },
    updateUserRankScore:  async  ( req:Request, res:Response)=> {
        const redisCli = await ConnectRedis();

        try{

            await redisCli.zAdd( req.body.key, { score:req.body.score, value:req.body.name  });
            res.json( {msg:"ok"} );

        }catch( err ){
            console.log( err );
            res.status(605).json( {msg:err} );
        }finally{
            redisCli.quit();
        }
    },
}