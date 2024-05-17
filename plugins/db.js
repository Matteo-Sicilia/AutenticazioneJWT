import fastifyPlugin from "fastify-plugin";
import fastifyPostgres from "@fastify/postgres";

async function database(app) {
    await app.register(fastifyPostgres, {
        host: process.env.DB_HOST,
        port: 8080,
        database: "lezioni_node",
        user: process.env.DB_USER,
        password: process.env.DBPASS,
    });
}

export default fastifyPlugin(database);
