// import client from "../../../../config/cassandra";
import { cassandraClient } from "../../../../config/cassandra";

const executeQueries=async(query:string,params:[])=>{
    let response;
    try{

        const cassandra = cassandraClient.getInstance(); // Get the singleton instance
        const client = cassandraClient; // Use the cassandraClient directly
        // console.log(query);
        // console.log(params);
        response=await cassandra.execute(query,params,{ prepare: true });
    }catch(e){
        console.log(e);
    }
    return response;
}
export  {executeQueries};