import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessagemControler";
import { GetLast3MessageController } from "./controllers/GetLast3MessagemController";
import { ensureAuthenticatedr } from "./middleware/ensureAuthenticated";
import {ProfileUserController} from "./controllers/ProfileUserController";

const router = Router();

router.post("/authenticate", new AuthenticateUserController().handle);

router.post("/messages", ensureAuthenticatedr, new CreateMessageController().handle);

router.get("/lastmessages", new GetLast3MessageController().handle);

router.get("/profele", ensureAuthenticatedr, new ProfileUserController().handle);

router.get("/github", (request, response) => {
    response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
});

router.get("/singin/callback", (request, response) => {
    const { code } = request.query;

    return response.json(code);
})

export { router };