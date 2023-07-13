import { Router } from "express";
import AuthController from "./auth-controller";
import AuthValidators from "./auth-validators";


class AuthRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.postRouter();
    }

    //SignUp new User
    //SignIn User
    postRouter() {
        this.router.post("/signIn", AuthValidators.signIn(), AuthController.signIn)
        this.router.post("/signUp", AuthValidators.signUp(), AuthController.signUp)
    }

}

export default new AuthRouter().router;

