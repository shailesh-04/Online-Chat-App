import auth from "#models/auth.js";
class AuthPublicController {
    async index(req, res) {
        try {
            const token = req.cookies.token;
            if (token) {
                res.render("app.html", { user: token[0] });
            } else res.render("index.html");
        } catch (error) {
            res.status(500).send({
                message: "faild to geting this page, find server error",
                detail: error.message,
            });
        }
    }
    async login(req, res) {
        try {
            const rows = await auth.login(req.body);
            if (rows.length > 0) {
                res.cookie("token", rows, { maxAge: 1 * 60 * 60 * 1000 });
                res.redirect("/");
            } else {
                res.send(
                    'Invalid email or password. <a href="/">Try again</a>'
                );
            }
        } catch (error) {
            return res.status(500).send({
                message: "faild to login user!, find server error",
                detail: error.message,
            });
        }
    }
    async logout(req, res) {
        res.clearCookie("token");
        res.redirect("/");
    }
}

export default new AuthPublicController();
