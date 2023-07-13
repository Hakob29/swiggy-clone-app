import User from './user.model';
import * as bcrypt from "bcrypt";
import * as express from "express";
import { validationResult } from 'express-validator';

class UserController {
    constructor() {

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
            const err = validationResult(req);
            if (!err.isEmpty()) {
                next(err.mapped())
            } else {
                const id = req.params.id;
                const newUser = req.body;
                const updatedUser = await User.findByIdAndUpdate(id, {
                    name: newUser.name,
                    email: newUser.email,
                    phone: newUser.phone,
                    password: await bcrypt.hash(newUser.password, 10),
                    type: newUser.type,
                    status: newUser.status
                })
                await updatedUser.save();
                res.status(200).json({
                    name: newUser.name,
                    email: newUser.email,
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