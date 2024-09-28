import express from "express"
import axios from "axios"
import bodyParser from "body-parser";

const app = express();
const port = 3000;


const API_Key = "";
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



app.get("/", (req, res) => {
    res.render("index.ejs");
})


app.post("/city", async (req, res)=>{
    const city = req.body.city;
    res.render("index.ejs");
    const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_Key}`);
    const lat = response.data[0].lat;
    const lon = response.data[0].lon;

    
})
app.listen(port, ()=> {
    console.log("server running on port: " + port);
})
