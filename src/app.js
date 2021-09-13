const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const partialDirectoryPath = path.join(__dirname, '../templates/partials');

// Setup handlersbar engine, view and partial location
hbs.registerPartials(partialDirectoryPath);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views')); // customize the directory of hbs

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a addressssss',
        });
    }
    geocode(
        req.query.address,
        (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({
                    error,
                });
            }
            forecast({ latitude, longitude }, (error, forecastData) => {
                if (error) {
                    return res.send({ error });
                }
                res.send({
                    forecastData: forecastData,
                    location,
                    address: req.query.address,
                });
            });
        }
    );
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address,
    // });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term',
        });
    }
    res.send({
        products: [],
        address: [],
    });
});
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'NguyenDang52',
        errorMessage: 'Article not found',
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'NguyenDang52',
        errorMessage: 'Page not found',
    });
});
app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});
