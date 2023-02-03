const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const karyawan = require("./routes/karyawan.routes.js");
const user = require("./routes/users.routes.js");
const wrong_routes = require("./error_handling/wrong_routes_warning.js");

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

app.use(express.json());
app.use(cors(corsOptions));

app.use(
    express.urlencoded({
        extended: true,
    })
);

// Define routes for karyawan and user data
app.use("/api/karyawan", karyawan);
app.use("/api/user", user);

// Error handling for wrong route
app.use(wrong_routes);

app.listen(port, () => {
    console.log(`Karyawan app listening at http://localhost:${port}`);
});
