import * as path from "path";
import fs from "fs";
import { resolvers } from "./resolvers";
import {typedef} from "./typedef"
import {queries} from "./queries"
import {mutation} from "./mutation"




export const User={
    typedef,queries,mutation,resolvers
}