import { Request, Response } from "express";
import { GetLast3MessageService } from "../services/GetLast3MessagemService";

class GetLast3MessageController{

    async handle(request: Request, response: Response){

        const service = new GetLast3MessageService();

        const resultado = await service.execute();
        
        return response.json(resultado);
    }
}

export {GetLast3MessageController}