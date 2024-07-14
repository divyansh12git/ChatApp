import Cryptr from "cryptr";

const cryptr = new Cryptr('myTotallySecretKey', { encoding: 'base64', pbkdf2Iterations: 10000, saltLength: 10 });

const EncrptData=(data:String):String=>{
    const encryptedString = cryptr.encrypt(data.toString());
    console.log(encryptedString);
    return encryptedString;
}

const DecryptData=(data:String):String=>{
    const decryptedString = cryptr.decrypt(data.toString());
    console.log(decryptedString);
    return decryptedString;
}
export {EncrptData,DecryptData};