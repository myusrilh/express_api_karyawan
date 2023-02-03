const connection = require("../config/db.js");

const User = (user) => {
    this.username = user.username;
    this.password = user.password;
    this.role = user.role;
};

User.getUserByUsernameAndPassword = async (request, result, next) => {
    try {
        await connection.query("SELECT * FROM users WHERE username = ? AND password = ?", [request.body.username, request.body.password], (err, res) => {
            if (err) {
                console.log("error: ", err);
                return result.status(400).send({ error: err, data: null, message: "Error Login", status: "failed" });
            }

            if (res.length) {
                console.log("found user: ", res);
                return result.status(200).send({ error: false, data: res, message: "Login berhasil", status: "success" });
            }

            return result.status(204).send({ message: "Data not found", data: null });
        });
    } catch (error) {
        next(error);
    }
};

module.exports = User;