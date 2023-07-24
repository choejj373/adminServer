
import { Request, Response } from 'express';
import { __dirname } from '../main.js'

export const main = {
    home : async ( req:Request, res:Response)=>{
        res.sendFile( __dirname + '/src/public/html/index.html')

    },
}