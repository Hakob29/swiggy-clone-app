import User from '../models/user.model';
import * as bcrypt from "bcrypt";
import * as express from "express";
import { validationResult } from 'express-validator';

class UserController {
    constructor() {

    }

    //Login User
    async signIn(req: express.Request, res: express.Response, next: any) {
        try {
            var err = validationResult(req);
            if (!err.isEmpty()) {
                next(err.mapped())
            } else {
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
            }

        } catch (err) {
            next(err);
        }
    }

    //Register User
    async signUp(req: express.Request, res: express.Response, next: any) {
        try {
            var err = validationResult(req);
            if (!err.isEmpty()) {
                next(err.mapped())
            } else {
                const { name, email, password } = req.body;
                const newUser = new User({
                    name: name,
                    email: email,
                    password: await bcrypt.hash(password, 10)
                })
                newUser.save()
                    .then((user) => res.status(201).send({ name: user.name, email: user.email }))
                    .catch((err) => {
                        next(new Error(err.message));
                    })
            }
        } catch (err) {
            next(err)
        }
    }

    //Get All Users
    async getUser(req: express.Request, res: express.Response, next: any) {
        try {
            const expectedUsers = Object.values(await User.find()).map((el) => {
                return {
                    name: el.name,
                    email: el.email
                }
            })
            res.status(200).json(expectedUsers);
        } catch (err) {
            next(err);
        }
    }

    //Get User By Id
    async getone(req: express.Request, res: express.Response, next: any) {
        try {
            const email = req.params.email
            const user = await User.findOne({ email });
            res.status(200).json({
                name: user.name,
                email: user.email
            });
        } catch (err) {
            next(err);
        }
    }


    //Update User By Id 
    async update(req: express.Request, res: express.Response, next: any) {
        try {
            var err = validationResult(req);
            if (!err.isEmpty()) {
                next(err.mapped())
            } else {
                const id = req.params.id;
                const newUser = req.body;
                const updatedUser = await User.findByIdAndUpdate(id, {
                    name: newUser.name,
                    email: newUser.email,
                    password: await bcrypt.hash(newUser.password, 10)
                })
                await updatedUser.save();
                res.status(200).json({
                    name: newUser.name,
                    email: newUser.email
                })
            }
        } catch (err) {
            next(err);
        }
    }

    //Delete User By Id
    async delete(req: express.Request, res: express.Response, next: any) {
        try {
            const id = req.params.id;
            await User.findByIdAndDelete({ _id: id });
            res.status(200).json({
                message: `User with id: ${id} has been deleted successfully!`
            })
        } catch (err) {
            next(err);
        }
    }

}

export default new UserController();