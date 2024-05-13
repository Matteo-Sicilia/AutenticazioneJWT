import fastifyPlugin from "fastify-plugin";
import fastifyPostgres from "@fastify/postgres";

async function database(app) {
    await app.register(fastifyPostgres, {
        host: "127.0.0.1",
        port: 8080,
        database: "lezioni_node",
        user: "postgres",
        password: "pinocembro",
    });
}

export default fastifyPlugin(database);
