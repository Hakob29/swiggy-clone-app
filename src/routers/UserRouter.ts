import { Router } from "express"
import UserController from "../controllers/UserController";


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

    }

    putRouter() {

    }

    deleteRouter() {

    }
}

export default new UserRouter().router;