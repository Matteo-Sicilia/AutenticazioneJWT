import createServer from "./server";

const app = await createServer(3000);

await app.listen({ port: 3000 });
