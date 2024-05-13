import S from "fluent-json-schema";

const bodySchema = S.object()
    .prop("username", S.string().required())
    .prop("password", S.string().required());

export default async function (app) {
    app.post("/", { schema: { body: bodySchema } }, async (req, res) => {
        const { username, password } = req.body;
        const result = await app.pg.query(
            "SELECT * FROM users WHERE username = $1 AND password = $2",
            [username, password]
        );

        app.log.warn(result.rows);
        return { hello: "world" };
    });
}
