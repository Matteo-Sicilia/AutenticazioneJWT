export default async function (app) {
    app.get("/", async (request, reply) => {
        return { hello: "world" };
    });
}
