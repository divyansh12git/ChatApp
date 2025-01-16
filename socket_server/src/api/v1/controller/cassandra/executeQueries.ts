import client from "../../../../config/cassandra";


const executeQueries=(queries:string[],params:[]):Promise<any>=>{
    const response:any[]=[];
    const pro=new Promise((resolve,reject)=>{
        client.connect((err)=>{
            if(err){
                console.log(err);
                client.shutdown();
                reject(response);
            }
        
            queries.map((query,ind)=>{
                try{
                    // console.log(query);
                    // console.log(params);
                    client.execute(query,params,{ prepare: true },(error,result)=>{
                        if (error) {
                            console.error(`Error while executing ${ind} query`, error);
                        } else {
                            // console.log('Query result:', result);
                            response.push(result);
                            // console.log(result.rows);
                        }
                        if(ind===queries.length-1){
                            client.shutdown();
                            resolve(response);
                        }
                    })
        
        
                }catch(e){
                    console.log(e);
                    client.shutdown();
                    reject(response);
                }
            });
        }) 
    });
    return pro;
}
export  {executeQueries};