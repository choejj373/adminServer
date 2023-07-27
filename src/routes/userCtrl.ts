
import { Request, Response } from 'express';
// import { ConnectRedis } from '../config/redis.js'
import { GetConnection, ReleaseConnection } from "../config/db.js"

export const user = {
    getUserInfo : async ( req:Request, res:Response)=>{
        const connDB = await GetConnection();
        const userName = req.params.name;
        console.log( userName );
        try{
            const [row]:any = await connDB.query("SELECT * FROM user WHERE name=?;",[userName] );
            res.json( {msg:"ok", userInfo:row[0]} );
        }catch( err ){
            console.log( err );
            res.status(701).json( {msg:err} );
        }finally{
            ReleaseConnection( connDB );
        }
    },
    userGetUserAccountInfo: async ( req:Request, res:Response)=>{
        const connDB = await GetConnection();
        const userId = Number(req.params.id);
        console.log( userId );
        try{
            const [rows]:any = await connDB.query("SELECT * FROM account WHERE user_id=?;",[userId] );
            res.json( {msg:"ok", userAccountInfo:rows} );
        }catch( err ){
            console.log( err );
            res.status(701).json( {msg:err} );
        }finally{
            ReleaseConnection( connDB );
        }
    },
    getUserItemInfo: async ( req:Request, res:Response)=>{
        const connDB = await GetConnection();
        const userId = Number(req.params.id);
        console.log( userId );
        try{
            const [rows]:any = await connDB.query("SELECT * FROM user_item WHERE owner=?;",[userId] );
            res.json( {msg:"ok", userItemInfo:rows} );
        }catch( err ){
            console.log( err );
            res.status(701).json( {msg:err} );
        }finally{
            ReleaseConnection( connDB );
        }
    },
    getUserFriendInfo: async ( req:Request, res:Response)=>{
        const connDB = await GetConnection();
        const userId = Number(req.params.id);
        console.log( userId );
        try{
            const [rows]:any = await connDB.query("SELECT * FROM user_friend WHERE owner=?;",[userId] );
            res.json( {msg:"ok", userFriendInfo:rows} );
        }catch( err ){
            console.log( err );
            res.status(701).json( {msg:err} );
        }finally{
            ReleaseConnection( connDB );
        }
    },
    getUserGuildInfo: async ( req:Request, res:Response)=>{
        const connDB = await GetConnection();
        const guildId = Number(req.params.id);
        console.log( guildId );
        try{
            const [rows]:any = await connDB.query("SELECT * FROM guild WHERE id=?;",[guildId] );
            res.json( {msg:"ok", userGuildInfo:rows} );
        }catch( err ){
            console.log( err );
            res.status(701).json( {msg:err} );
        }finally{
            ReleaseConnection( connDB );
        }
    },
    getUserMailInfo: async ( req:Request, res:Response)=>{
        const connDB = await GetConnection();
        const userId = Number(req.params.id);
        console.log( userId );
        try{
            const [rows]:any = await connDB.query("SELECT * FROM mail WHERE receiver_user_id=?;",[userId] );
            res.json( {msg:"ok", userMailInfo:rows} );
        }catch( err ){
            console.log( err );
            res.status(701).json( {msg:err} );
        }finally{
            ReleaseConnection( connDB );
        }
    },
    getUserQuestInfo: async ( req:Request, res:Response)=>{
        const connDB = await GetConnection();
        const userId = Number(req.params.id);
        console.log( userId );
        try{
            const [rows]:any = await connDB.query("SELECT * FROM user_quest WHERE owner=?;",[userId] );
            res.json( {msg:"ok", userQuestInfo:rows} );
        }catch( err ){
            console.log( err );
            res.status(701).json( {msg:err} );
        }finally{
            ReleaseConnection( connDB );
        }
    },
    getUserResctrictInfo: async ( req:Request, res:Response)=>{
        const connDB = await GetConnection();
        const userId = Number(req.params.id);
        console.log( userId );
        try{
            const [rows]:any = await connDB.query("SELECT * FROM user_restrict WHERE user_id=?;",[userId] );
            res.json( {msg:"ok", userRestrictInfo:rows} );
        }catch( err ){
            console.log( err );
            res.status(701).json( {msg:err} );
        }finally{
            ReleaseConnection( connDB );
        }
    },
}