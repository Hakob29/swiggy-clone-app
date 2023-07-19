import { Router } from "express";
import AuthController from "./auth-controller";
import AuthValidators from "./auth-validators";
import { GlobalValidation } from "../middlewares/global-validation";


class AuthRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.postRouter();
    }

    //SignUp new User
    //SignIn User
    postRouter() {
        this.router.post("/signIn", AuthValidators.signIn(), GlobalValidation.checkError, AuthController.signIn)
        this.router.post("/signUp", AuthValidators.signUp(), GlobalValidation.checkError, AuthController.signUp)
    }

}

export default new AuthRouter().router;

