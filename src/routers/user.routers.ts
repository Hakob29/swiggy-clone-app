import { Router } from "express"
import UserController from "../controllers/user.controller";
import { UserValidators } from "../validators/user-validators";

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
        //Get All Users
        this.router.get("/getall", UserController.getUser)
        //Get User By Id
        this.router.get("/getone/:email", UserController.getone)
    }

    postRouter() {
        //SignIn User
        this.router.post("/signIn", UserValidators.signIn(), UserController.signIn)

        //SignUp new User
        this.router.post("/signUp", UserValidators.signUp(), UserController.signUp)
    }

    putRouter() {
        //Update User By Id 
        this.router.put("/update/:id", UserValidators.update(), UserController.update)

    }

    deleteRouter() {
        //Delete User By Id
        this.router.delete("/delete/:id", UserController.delete)
    }
}

export default new UserRouter().router;