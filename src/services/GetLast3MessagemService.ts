import prismaClient from "../prisma";

class GetLast3MessageService {
    
    async execute(){
        const messages = await prismaClient.messagem.findMany({
            take: 10,
            orderBy: {
                create_at: "desc",
            },
            include: {
                user: true,
            },
        });

        return messages;
    }
}

export {GetLast3MessageService}