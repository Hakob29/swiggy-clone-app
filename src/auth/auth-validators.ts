import { body } from "express-validator"


class AuthValidators {

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

}


export default AuthValidators
