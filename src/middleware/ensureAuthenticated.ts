import {Request, Response, NextFunction} from "express"
import { verify } from "jsonwebtoken"

interface IPayload {
    sub: string
}

export function ensureAuthenticatedr(request: Request, response: Response, netx: NextFunction){

    const authToken = request.headers.authorization;

    if(!authToken){
        return response.status(401).json({
            errorCode: "token invalido",
        });  
    }

    const [, token] = authToken.split(" ")

    try {
            const {sub} = verify(token, process.env.JWT_SECRET) as IPayload
            request.user_id = sub;
            return netx();
        }
        catch(err){
            return response.status(401).json({errorCode: "Token Invalido"})
        }
}