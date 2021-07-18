const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")
const app = express();
app.use(bodyParser.urlencoded({extended: true}))
//11521718a0eeb7995e425fbfe2b254cd
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function (req,res){
    console.log(req.body.city);
    const city = req.body.city.toLowerCase();
    const apiKey = "11521718a0eeb7995e425fbfe2b254cd";
    const unit = "metric";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            res.write(`<h1>${weatherData.name}</h1>`)
            res.write(`<h4>${weatherData.sys.country}</h4>`)
            res.write(`<p>${weatherData.main.temp}</p>`)
            res.write(`<p>${weatherData.weather[0].description}</p>`)
            res.write(`<img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png">`)
            res.send();
        })
    })
})







app.listen(3000, function () {
    console.log("Weather map is running at 3000")
})