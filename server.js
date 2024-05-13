import fastify from "fastify";
import autoload from "@fastify/autoload";
import fastifySensible from "@fastify/sensible";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function createServer() {
    const app = Fastify({
        logger: true,
    });

    await app.register(fastifySensible);

    await app.register(autoload, {
        dir: join(__dirname, "routes"),
        options: { prefix: "/api" },
        forceESM: true,
    });

    await app.ready();
    console.log(app.printRoutes());

    return app;
}
