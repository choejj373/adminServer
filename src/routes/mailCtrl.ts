
import { Request, Response } from 'express';
import { GetConnection, ReleaseConnection } from "../config/db.js"

export const mail = {
    sendMail : async ( req:Request, res:Response)=>{
        const conn = await GetConnection();

        try{

            const gold = req.body.gold;
            const title = req.body.title;
            const content = req.body.content;
            const receiverUserName = req.body.userName;
            const items = req.body.items;

            await conn.beginTransaction();

            let query = "INSERT INTO mail(sender_user_id, gold, title, msg, receiver_user_id, type) (SELECT 0,?,?,?,id,1 FROM user WHERE name =?);";
            let [result]:any = await conn.query( query, [ gold, title, content, receiverUserName] );

            console.log( result );
            const mailId = result.insertId;

            if( result.affectedRows == 0 ){
                throw query;
            }

            for( const item of items){
                if( item.index === 0){
                    continue;
                }
                query = "INSERT INTO mail_item(mail_id, item_id, item_index, owner) VALUES ( ?, 0, ?, 0 );";
                [result] = await conn.query( query, [ mailId, item.index] );

                console.log( result );
                if( result.affectedRows == 0 ){
                    throw query;
                }
            }
            await conn.commit();
            res.json( {msg:"ok"} );
        }catch( err:any ){
            await conn.rollback();
            res.status(801).json( {msg:err} );
            console.log( err );
        }finally{
            ReleaseConnection( conn );
        }   
    },
    getMailsSentFromAdmin : async ( req:Request, res:Response)=>{
        const connDB = await GetConnection();
        try{
            const [row]:any = await connDB.query("SELECT * FROM mail WHERE sender_user_id=0 AND type=1;" );
            res.json( {msg:"ok", mailList:row} );
        }catch( err ){
            console.log( err );
            res.status(802).json( {msg:err} );
        }finally{
            ReleaseConnection( connDB );
        }
    },
    getMailAttachedItems : async ( req:Request, res:Response)=>{

        const mailId = req.params.id;
        const connDB = await GetConnection();
        try{
            const [row]:any = await connDB.query("SELECT * FROM mail_item WHERE mail_id=?;",[mailId] );
            res.json( {msg:"ok", itemList:row} );
        }catch( err ){
            console.log( err );
            res.status(803).json( {msg:err} );
        }finally{
            ReleaseConnection( connDB );
        }
    },

}