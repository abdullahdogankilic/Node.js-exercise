import * as dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import { db } from "./../db";
import jwt from "jsonwebtoken";
import { as } from "pg-promise";

const logIn = async(req: Request, res: Response){
   const {username,password}= req.body;

   const user = await db.none(`"SELECT * FROM users WHERE id=$1;`,username);

   if(user && user.password === password){
    const payload ={
        id: user.id,
        username,
    }
    const {SECRET = "" } = process.env;
    const token = jwt.sign(payload, SECRET);

    await db.none(`UPDATE users SET token=$2  WHERE id=$1`,[user.id,token]);
    res.status(200).json({id:user.id,username,token});
   }else{
    res.status(400).json({msg:"username or password incorrect"})
   }
}

const singUp = async(req: Request, res: Response){
    const {username,password}= req.body;

   const user = db.oneORNone(`"SELECT * FROM users WHERE id=$1;`,username);

   if(user){
    res.status(409).json({msg:"username already in use"})
   }else{
   const {id} = await db.one(`INSERT INTO (username,password ) VALUES($1,$2) RETURNING id`,[username,password]);
   
   res.status(201).json({id,msg: "user created successful."})
}
}

export {logIn,singUp};
