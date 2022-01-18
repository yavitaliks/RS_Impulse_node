import prismaClient from "../prisma";
import {io } from "../app"

class CreateMessageService {
    async execute(text: string, user_id: string){
        const message = await prismaClient.messagem.create({
            data: {
                text,
                user_id
            },
            include:{
                user: true,
            },
        });
        
        const infoWS = {
            text: message.text,
            user_id: message.user_id,
            create_at: message.create_at,
            user:{
                name: message.user.name,
                login: message.user.login,
                avatar_url: message.user.avatar_url
            }
        }

        io.emit("new_menssage", infoWS)

        return message;
    }
}

export {CreateMessageService};