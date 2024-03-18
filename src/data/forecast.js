const request = require("request")


const forecast = (longtitude,latitude,callback) => {
    const Url = "https://api.weatherapi.com/v1/current.json?key=7f97e74ef23b418c97a155211230503&q=" + latitude + "," + longtitude

    request({ url: Url, json: true }, (error, response) => {
        if (error) {
            callback(" unable to connect geocode service error ", undefined)
        }
        else if (response.body.error) {
            callback(response.body.error.message, undefined)
        }
        else {
            callback (undefined , response.body.location.name + " this is  : " + response.body.current.condition.text 
            + "the temp is : "  + response.body.current.temp_c  )
        }
    })
}
module.exports=forecast