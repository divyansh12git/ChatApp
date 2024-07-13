import { Router } from "express";
import { signupHandler } from "./handlers/signup";

const authRoute=Router();

authRoute.post("/signup",signupHandler)