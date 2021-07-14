const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCode = require("./utils/geoCode")
const foreCast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000

//define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '/templates/views')
const partialsPath = path.join(__dirname, '/templates/partials')

//Setup static directory to serve
app.use(express.static(publicDirPath))

//Setup handlebars engine and views location
app.set('view engine', 'hbs')//handlebar template
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)//header,footer

//define routes to templates
app.get('', (req, res) => {//handlebar template
    res.render('index', {
        title: 'Weather App',
        name: 'Nizam'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Nizam'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Nizam',
        message: 'Post your queries here'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Provide an address'
        })
    }
    geoCode(req.query.address, (error, { lattitude, longitude, place_name } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        else {
            setTimeout(() => {
                foreCast(lattitude, longitude, (err, { weather_descriptions, temperature, precipitation ,feelslike} = {}) => {
                    if (err) {
                        return res.send({
                            error: err
                        })
                    }
                    else {
                        res.send({
                            place_name,
                            lattitude,
                            longitude,
                            weather_descriptions,
                            temperature,
                            precipitation,
                            feelslike
                        })
                    }
                })
            }, 500)
        }
    })
})

app.get('/products', (req, res) => {//1 req,1 res
    if (!req.query.search) {
        return res.send({
            error: 'Provide search a term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        message: 'Help article not found',
        name: 'Nizam'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        message: '404 error -> Page not found',
        name: 'Nizam'
    })
})

app.listen(port, () => {
    console.log('Server running on PORT : '+port);
})