import * as express from "express";
import { validationResult } from "express-validator";


export class GlobalValidation {
    static checkError(req: express.Request, res: express.Response, next: any) {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            next(err.mapped())
        } else {
            next();
        }
    }
}