import { Router } from "express"
import UserController from "./user.controller";
import { UserValidators } from "./user-validators";

class UserRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.getRouter();
        this.postRouter();
        this.putRouter();
        this.deleteRouter();

    }


    postRouter() {

    }

    //Get All Users
    //Get User By Id
    getRouter() {
        this.router.get("/getall", UserController.getUser)
        this.router.get("/getone/:email", UserController.getone)
    }


    //Update User By Id 
    putRouter() {
        this.router.put("/update/:id", UserValidators.update(), UserController.update)

    }

    //Delete User By Id
    deleteRouter() {
        this.router.delete("/delete/:id", UserController.delete)
    }
}


export default new UserRouter().router;