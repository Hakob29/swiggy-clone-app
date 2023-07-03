class UserController {
    constructor() {

    }
    login(req: any, res: any, next: any) {
        try {
            res.status(200).send("Its a login page...");
        } catch (err) {
            next(err);
        }
    }
}

export default new UserController();