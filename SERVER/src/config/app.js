import express from "express";
import path from "path";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import database from "#config/database.js";
import router from "../routes/_index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.join(path.dirname(__filename), "../");
class App {
    constructor() {
        this.app = express();
        this.appConfig();
        this.middeware();
        database.testConnecion();
        this.routes();
    }
    async appConfig() {
        config();
        this.app.set("view engine", "ejs");
        this.app.set("views", path.join(__dirname, "views/"));
    }
    async middeware() {
        this.app.use(express.static(path.join(__dirname, "/views")));
        this.app.use("/assets", express.static(path.join(__dirname, "assets")));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(cookieParser(process.env.SECRET_KEY));
        this.app.use(
            cors({
                origin: "http://localhost:5173",
                credentials: true,
            })
        );
        this.app.use(bodyParser.json());
        this.app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).json({ message: "Something broke!" });
        });
    }
    async routes() {
        this.app.get("/users.api", async (req,res) => {
            const data  = await database.query("select * from users");
            res.json(data);
        });
        this.app.use("/", router);
    }
}
export default new App().app;
