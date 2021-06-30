const http = require("http");
const fs = require("fs");
var requests = require("requests");
const homeFile = fs.readFileSync("home.html", "utf-8");
const replaceVal = (tempVal, orgVal)=>{

    let temperature = tempVal.replace("{%tempval%}", (Math.floor(orgVal.main.temp - 273.15)));
        temperature = temperature.replace("{%tempmin%}", (Math.floor(orgVal.main. temp_min - 273.15)));
        temperature = temperature.replace("{%tempmax%}", (Math.floor(orgVal.main.temp_max - 273.15)));
        temperature = temperature.replace("{%location%}", (orgVal.name));
        temperature = temperature.replace("{%country%}", (orgVal.sys.country));
        temperature = temperature.replace("{%Wstatus%}", (orgVal.weather[0].main));
        temperature = temperature.replace("{%Description%}", (orgVal.weather[0].description));

        
        console.log(orgVal.weather[0].description);
        

        return temperature;
}
const server = http.createServer((req, res) => {

    if(req.url == "/")
    {
        requests(" https://api.openweathermap.org/data/2.5/weather?q=Bangalore&appid=1bac5e7065da81cdbeb8749e2c68ff78 ")
        .on("data",(chunk) => {
            const objdata = JSON.parse(chunk);
            const arrData = [objdata];
            const realTimeData = arrData.map((val) => replaceVal(homeFile,val)).join("");
            res.write(realTimeData);
            // console.log(realTimeData.join(""));

            // console.log(Math.ceil(arrData[0].main.temp - 273.15) + "\n");
           
        })
        .on( "end", (err) => {
            if(err) return console.log("Connection closed due to errors:-", err);
                console.log("end");
        }  );
    }     
});


server.listen(8000, "127.0.0.1");