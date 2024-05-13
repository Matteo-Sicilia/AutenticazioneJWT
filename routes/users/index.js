export default async function (app) {
    app.get("/", async (req, res) => {
        const auth = req.headers["authorization"];

        if (auth) {
            const token = auth.split(" ")[1];
            const decoded = app.jwt.verify(token);
            app.log.warn(decoded);
        }

        return [];
    });
}
