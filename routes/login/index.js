export default async function (app) {
    app.post("/", async (request, reply) => {
        return { hello: "world" };
    });
}
