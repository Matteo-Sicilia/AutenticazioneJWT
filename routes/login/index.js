import S from "fluent-json-schema";

const bodySchema = S.object().prop("refreshToken", S.string().required());

export default async function (app) {
    app.post("/", { schema: { body: bodySchema } }, async (req, res) => {
        const { userId, refresh } = app.jwt.verify(req.body.refreshToken);

        if (refresh !== true) {
            throw app.httpErrors.badRequest("Invalid token");
        }

        const result = await app.pg.query(
            "SELECT * FROM users WHERE username = $1 AND password = $2",
            [username, password]
        );

        if (result.rows.length !== 1) {
            throw app.httpErrors.unauthorized("Invalid credentials");
        }

        const user = result.rows[0];

        const payload = {
            userId: user.id,
            role: username === "admin" ? "admin" : "standard",
        };

        const refreshPayload = {
            userId: user.id,
        };

        const accessToken = app.jwt.sign({ payload }, { expiresIn: "1h" });
        const refreshToken = app.jwt.sign(
            { payload: refreshPayload },
            { expiresIn: "7d" }
        );
        return { accessToken, refreshToken };
    });
}
