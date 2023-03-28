import { appEnv } from "../../app/envs/app.env";
import { createServer } from "../config/express.config";
import { createRoutes } from "./express.routes";

export const runServer = () => {
    const app = createServer();

    createRoutes(app);

    app.listen(appEnv.port, () => {
        console.log(`Api running at port: ${appEnv.port}`);
    });
};
