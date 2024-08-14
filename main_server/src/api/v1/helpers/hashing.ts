import bcrypt from "bcrypt";
import {randomBytes} from 'node:crypto';

const saltRound=12;

const generateHash=async(text:String):Promise<string>=>{
    const hash:string=bcrypt.hashSync(text.toString(),saltRound);
    return hash;
}

const compareHash=async(data:String,hashval:String):Promise<boolean>=>{
    return bcrypt.compareSync(data.toString(),hashval.toString());
}

export {
    generateHash,
    compareHash
};