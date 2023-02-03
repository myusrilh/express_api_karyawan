const express = require("express");
const app = express();

app.get('*', function (req, res) {
    res.status(404).send('Wrong route! \n Try another route!');
    console.log("Hayo, salah input route.");
});
app.post('*', function (req, res) {
    res.status(404).send('Wrong route! \n Try another route!');
    console.log("Hayo, salah input route.");
});
app.put('*', function (req, res) {
    res.status(404).send('Wrong route! \n Try another route!');
    console.log("Hayo, salah input route.");
});
app.delete('*', function (req, res) {
    res.status(404).send('Wrong route! \n Try another route!');
    console.log("Hayo, salah input route.");
});

module.exports = app;