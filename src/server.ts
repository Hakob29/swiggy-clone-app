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
        this.app.use((err: any, req: express.Request, res: express.Response, next: any) => {
            res.status(500)
                .json({
                    message: err.message || "Something went wrong!",
                    statusCode: 500
                })
        })
    }
}

export default new Server().app;