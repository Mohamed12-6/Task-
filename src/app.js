const express = require("express")

const app = express()

const port = process.env.port || 3000



// app.get("/",(req,res)=>{
//     res.send("Hello This is in Home Page")
// })

// app.get("/about",(req,res)=>{
//     res.send("Hello About Page")
// })
// app.get("/teams",(req,res)=>{
//     res.send("Hello TEam Page")
// })
// app.get("/page1", (req, res) => {
//     res.send("Page 1 ")
// })
// app.get("/page2", (req, res) => {
//     res.send("Page 2")
// })
// app.get("/page3", (req, res) => {
//     res.send("Page 3")
// })

// //Html 
// app.get("/page4", (req, res) => {
//     res.send('<h2>Medo Osama</h2> <button>Send</button>')
// })

// // object
// app.get('/data2', (req, res) => {
//     res.send({
//         name: "ahmed", age: "50", city: "cairo"
//     })
// })



// static page


const path = require('path');

// console.log(__dirname)
console.log(path.join(__dirname, "../public"))


const staticPage = path.join(__dirname, "../public")

app.use(express.static(staticPage))








//////////////////////////////////////////////////////////////////////////////////

app.set('view engine', 'hbs');

const viewsDirectory = path.join(__dirname, '../temp1/views')
app.set('views', viewsDirectory);

// to read partials : 
var hbs = require('hbs');
const partialsPath = path.join(__dirname, "../Temp1/partials")
hbs.registerPartials(partialsPath)


app.get('/', (req, res) => {
    res.render('index', {
        title: "HOME",
        desc: "This is home page"
    })
})

app.get('/service', (req, res) => {
    res.render('service', {
        title: "SERVICE",
        name: "Mohamed",
        city: "Cairo",
        age: 40,
        img1: "images/icons8-team-m0oSTE_MjsI-unsplash.jpg"
    })
})


app.get('/team', (req, res) => {
    res.render('team', {
        title: "TEAM",
        name: "reem",
        city: "mansoura",
        age: 25,
        img2: "images/freestocks-9UVmlIb0wJU-unsplash.jpg"
    })
})
////////////////////////////////////////////////////

const geocode = require('./data/geocode')
const forecast = require('./data/forecast')

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "you must write an address "
        })
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error })
        }
        forecast(data.longtitude, data.latitude, (error, forecastdata) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastdata,
                location: req.query.address
            })
        })
    })
})




////////////////////////

app.get('*', (req, res) => {
    res.send('404 Page Not Founded')
})

///////////////////////////////////////////////////////////////////////////////////

app.listen(port, () => {
    console.log(`Server started at ${port}`)
})