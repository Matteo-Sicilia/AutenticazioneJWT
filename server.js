import Fastify from "fastify";
import autoload from "@fastify/autoload";
import fastifySensible from "@fastify/sensible";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function createServer() {
    const app = Fastify({
        logger: {
            transport: {
                target: "pino-pretty",
            },
        },
    });

    await app.register(fastifySensible);

    await app.register(autoload, {
        dir: join(__dirname, "routes"),
        options: { prefix: "/api" },
        forceESM: true,
    });

    await app.ready();
    console.log(app.printRoutes());

    app.log.warn(process.env.CONNSTRING);

    return app;
}
