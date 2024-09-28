import express from "express"
import axios from "axios"
import bodyParser from "body-parser";

const app = express();
const port = 3000;


const API_Key = "94cd2ad3ce3a6c477292027ee79f5483";
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



app.get("/", (req, res) => {
    res.render("index.ejs",);
})


app.post("/city", async (req, res)=>{
    const city = req.body.city;
    res.render("index.ejs");
    const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_Key}`);
    const lat = response.data[0].lat;
    const lon = response.data[0].lon;
    const getWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,daily&appid=${API_Key}`);
    res.render("index.ejs", {currentWeather: getWeather.data});

    
})
app.listen(port, ()=> {
    console.log("server running on port: " + port);
})
