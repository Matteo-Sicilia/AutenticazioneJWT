import S from "fluent-json-schema";

const bodySchema = S.object()
    .prop("username", S.string().required())
    .prop("password", S.string().required());

export default async function (app) {
    app.get("/", { request: { body: bodySchema } }, async (req, res) => {
        app.log.info(req.body);
        return { hello: "world" };
    });
}
