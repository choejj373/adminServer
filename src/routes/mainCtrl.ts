
import { Request, Response } from 'express';

export const main = {
    home : async ( req:Request, res:Response)=>{
        res.render('./index.ejs')

    },
}