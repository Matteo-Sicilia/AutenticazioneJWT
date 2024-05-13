export default async function (app) {
    app.get("/", async (req, res) => {
        try {
            const { payload } = await req.jwtVerify();

            if (payload.role === "admin") {
                const result = await app.pg.query("SELECT * FROM users");
                return result.rows;
            } else {
                const result = await app.pg.query(
                    "SELECT * FROM users WHERE id = $1",
                    [payload.userId]
                );
            }
        } catch (e) {
            throw app.httpErrors.unauthorized("Invalid token");
        }
    });
}
