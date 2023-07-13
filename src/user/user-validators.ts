import { body } from "express-validator";

export class UserValidators {

    static update() {
        return [
            body("name", "Please insert only string!").isString(),
            body("email", "Please insert a valid email address!").isEmail(),
            body("phone", "Phone number is required!").isString(),
            body("password", "Password length min 5 character!").isLength({ min: 5, max: 15 }),
            body("type", "User type is required!").isString(),
            body("status", "User status is required!").isString()
        ]
    }
} 