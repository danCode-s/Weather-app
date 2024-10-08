import express from "express"
import axios from "axios"
import bodyParser from "body-parser";

const app = express();
const port = 3000;


const API_Key = "";
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



app.get("/", (req, res) => {
    res.render("index.ejs",);
})


app.post("/city", async (req, res)=>{
    const city = req.body.city;
    const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_Key}`);
    const lat = response.data[0].lat;
    const lon = response.data[0].lon;
    const getWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,daily&appid=${API_Key}`);
    console.log(getWeather.data)
    const weatherDescription = getWeather.data.weather[0].description;
    let filePath = "";

    if(weatherDescription == "overcast clouds"){
        filePath = "/images/overcast.png"
    }else if (weatherDescription == "clear sky"){
        filePath = "/images/sunny.png";
    }else if(weatherDescription == "rain" || weatherDescription == "shower rain"){
        filePath = "/images/rainy.png";
    }else if(weatherDescription == "thuderstorm"){
        filePath = "/images/thunder.png";
    }else{
        filePath = "images/partially_cloudy.png";
    }
    res.render("index.ejs", {
        currentWeather: getWeather.data,
        filePath: filePath
    });
    
})
app.listen(port, ()=> {
    console.log("server running on port: " + port);
})
