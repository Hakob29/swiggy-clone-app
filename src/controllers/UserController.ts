class UserController {
    constructor() {

    }
    login(req: any, res: any) {
        res.status(200).send("Its a login page...");
    }
}

export default new UserController();