
import * as bcrypt from "bcrypt";
import * as express from "express";
import { validationResult } from 'express-validator';
import User from "../user/user.model"

class AuthController {

    constructor() { }

    //Login User
    async signIn(req: express.Request, res: express.Response, next: any) {
        try {
            const signInData = req.body;
            const expectedUser = await User.findOne({ email: signInData.email });
            if (!expectedUser) {
                next(new Error(`User with email ${signInData.email} don't exist!`))
            }
            if (!(await bcrypt.compare(signInData.password, expectedUser.password))) {
                next(new Error(`Wrong password, please try again!`))
            }
            res.status(200).json({
                access_token: "ok"
            })

        } catch (err) {
            next(err);
        }
    }

    //Register User
    async signUp(req: express.Request, res: express.Response, next: any) {
        try {
            const { name, email, password, type, status, phone } = req.body;
            const newUser = new User({
                name: name,
                email: email,
                phone: phone,
                password: await bcrypt.hash(password, 10),
                type: type,
                status: status
            })
            newUser.save()
                .then((user) => res.status(201).send({ name: user.name, email: user.email }))
                .catch((err) => {
                    next(new Error(err.message));
                })

        } catch (err) {
            next(err)
        }
    }


}

export default new AuthController()