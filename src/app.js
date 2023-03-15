const express = require("express");
const path = require("path");
require("./db/conn");
const User = require("./models/usermessage");
const hbs = require("hbs");
const {registerPartial, registerPartials} = require("hbs");

const app = express();
const port = process.env.PORT || 3000;

//Set Path
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partial_path = path.join(__dirname, "../templates/partials");

//Middleware
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist")));

app.use(express.urlencoded({extended: false}));
app.use(express.static(static_path))
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partial_path);

//Routing
app.get("/", (req, res) => {
    res.render("index");
})

/*app.get("/contact", (req, res) => {
    res.send("contact");
})*/

app.get("/About", (req, res) => {
    res.render("About");
})

app.get("/cantTouchMe", (req, res) => {
    res.render("cantTouchMe");
})

app.get("/Weather", (req, res) => {
    res.render("Weather");
})

app.get("/Map", (req, res) => {
    res.render("Map");
})

app.post("/contact", async(req, res) => {
    try {
        //res.send(req.body);
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render("index");
    } catch(error) {
        res.status(500).send(error);
    }
})

app.get("*", (req, res) => {
    res.render("404Error")
})

//Server Create
app.listen(port, () => {
    console.log(`Server Is Running At Port No ${port}`);
})