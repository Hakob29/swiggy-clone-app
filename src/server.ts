import * as express from "express"
import mongoose from "mongoose";
import { DB_URL } from "./configs/mongoDB-connection";
import UserRouter from "./routers/UserRouter";


class Server {
    public app: express.Application = express();

    constructor() {
        this.setConfigs();
        this.setRouters();
    }

    setConfigs() {
        this.connectToMongoDB();
    }

    connectToMongoDB() {
        mongoose.connect(DB_URL).then(() => {
            console.log("DB is Connected...");
        })
    }

    setRouters() {
        this.app.use("/api/user", UserRouter);
    }
}

export default new Server().app;