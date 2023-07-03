
import { HOST, PORT } from "./configs/server-connection";
import Server from "./server";
import * as express from "express";

const server: express.Application = Server;
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.listen(PORT, () => {
    console.log("Server is running at " + HOST + PORT);
})