import { body } from "express-validator";

export class UserValidators {
    static signUp() {
        return [
            body("name", "Please insert only string!").isString(),
            body("email", "Please insert a valid email address!").isEmail(),
            body("password", "Password length min 5 character!").isLength({ min: 5 })
        ]
    }

    static signIn() {
        return [
            body("email", "Please insert a valid email address!").isEmail(),
            body("password", "Password length min 5 character!").isLength({ min: 5 })
        ]
    }

    static update() {
        return [
            body("name", "Please insert only string!").isString(),
            body("email", "Please insert a valid email address!").isEmail(),
            body("password", "Password length min 5 character!").isLength({ min: 5 })
        ]
    }

}