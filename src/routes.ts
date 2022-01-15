import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessagemControler";

const router = Router();

router.post("/authenticate", new AuthenticateUserController().handle);

router.post("/messagem", new CreateMessageController().handle);

router.get("/github", (request, response) => {
    response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
});

router.get("/singin/callback", (request, response) => {
    const { code } = request.query;

    return response.json(code);
})

export { router };