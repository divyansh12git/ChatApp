import { ApolloServer } from '@apollo/server';
import {expressMiddleware} from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

const startApolloGraphqlServer=async():Promise<ApolloServer>=>{
    const gqlServer = new ApolloServer({
        typeDefs:`
            type Query{
                hello:String!
            }
        `,
        resolvers:{
            Query:{
                hello:()=>{return "Hi bro"}
            }
        },
      });


      await gqlServer.start().then(()=>{
            console.log(`Apollo Graphql server is ready to listen at route /graphql`);
      });

      return gqlServer;
}

export default startApolloGraphqlServer;