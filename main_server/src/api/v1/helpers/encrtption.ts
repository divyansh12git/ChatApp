import Cryptr from "cryptr";

const cryptr = new Cryptr('myTotallySecretKey', { encoding: 'base64', pbkdf2Iterations: 10000, saltLength: 10 });

const EncrptData=(data:Record<any,String>):Record<any,String>=>{
    for(let key in data){
        data[key] = cryptr.encrypt(data[key].toString());
    }
    return data;
}

const DecryptData=(data:Record<any,String>):Record<any,String>=>{
    try{
        for(let key in data){
            data[key] = cryptr.decrypt(data[key].toString()) || data[key];
        }
    }
    catch(e){
        return data
    }
    // console.log(data);
    return data;
}
export {EncrptData,DecryptData};