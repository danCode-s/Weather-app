import express from "express"
import axios from "axios"
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.post("/city", (req, res)=>{
    const city = req.body;
    res.render("index.ejs");
    console.log(city);
})
app.listen(port, ()=> {
    console.log("server running on port: " + port);
})
