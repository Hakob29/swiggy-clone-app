import { Router } from "express"
import UserController from "../controllers/user.controller";

class UserRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.getRouter();
        this.postRouter();
        this.putRouter();
        this.deleteRouter();

    }

    getRouter() {
        this.router.get("/login", UserController.login)
    }

    postRouter() {
        this.router.post("/register", UserController.register)
    }

    putRouter() {

    }

    deleteRouter() {

    }
}

export default new UserRouter().router;