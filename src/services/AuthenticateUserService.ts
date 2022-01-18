import axios from "axios";
import prismaClient from "../prisma/"
import { sign } from "jsonwebtoken"

interface IAcessTokenResponse {
    access_token: string
}

interface IUserResponse {
    login: string;
    id: number;
    name: string;
    avatar_url: string;
}

class AuthenticateUserService {

    async execute(code: string) {

        /* Recuperando informação do Access Token do usuario */
        const url = "https://github.com/login/oauth/access_token";
        const { data: accesTokenResponse } = await axios.post<IAcessTokenResponse>(url, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            headers: {
                "Accept": "application/json"
            }
        });

        /* Recuperando informação dos dados do usuario Logado (Nome,)*/
        const response = await axios.get<IUserResponse>("https://api.github.com/user", {
            headers: {
                authorization: `bearer ${accesTokenResponse.access_token}`,
            },
        });

        const { login, id, name, avatar_url } = response.data;

        let user = await prismaClient.user.findFirst({
            where: {
                github_id: id
            }
        })

        if (!user) {
            await prismaClient.user.create({
                data: {
                    github_id: id,
                    name,
                    login,
                    avatar_url,
                }
            })
            console.log("foi inserido")
        }

        const token = sign(
            {
            user: {
                name: user.name,
                login: user.login,
                id: user.id,
                avatar_url: user.avatar_url
            }
        },
        process.env.JWT_SECRET,
        {
            subject: user.id,
            expiresIn: "1d"
        }
        )

        console.log(response.data);
        console.log(token, user);
        return {token, user}
    }
}

export { AuthenticateUserService }