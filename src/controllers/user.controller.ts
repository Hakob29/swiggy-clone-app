import User from '../models/user.model';
import * as bcrypt from "bcrypt";

class UserController {
    constructor() {

    }

    //Login User
    async login(req: any, res: any, next: any) {
        try {
            res.status(200).send(req.query);
        } catch (err) {
            next(err);
        }
    }

    //Register User
    async register(req: any, res: any, next: any) {
        try {
            const { name, email, password } = req.body;
            const newUser = new User({
                name: name,
                email: email,
                password: await bcrypt.hash(password, 10)
            })
            newUser.save()
            res.status(200).send(newUser);
        } catch (err) {
            next(err)
        }
    }
}

export default new UserController();