import * as express from "express"
import * as mongoose from "mongoose";
import { DB_URL } from "./configs/mongoDB-connection";
import UserRouter from "./routers/user.routers";


class Server {
    public app: express.Application = express();

    constructor() {
        this.setConfigs();
        this.setRouters();
        this.errorHandling();
    }

    setConfigs() {
        this.connectToMongoDB();
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }

    connectToMongoDB() {
        mongoose.connect(DB_URL).then(() => {
            console.log("DB is Connected...");
        })
    }

    setRouters() {
        this.app.use("/api/user", UserRouter);
    }


    errorHandling() {
        this.app.use((err, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: err.message || "Something went wrong. Please try again!",
                status_code: errorStatus,
            })
        })
    }
}

export default new Server().app;