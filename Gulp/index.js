const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const users = require('./db.json').users;
const db = require('./db.json');
const express = require('express');
const fileUpload = require('express-fileupload');
//const app = express();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
// Custom route with login check, before JSON Server router
server.use(jsonServer.bodyParser);
server.post('/login', (req, res) => {
    //let adminUser = users[0];
    let user = users.find(item => item.login === req.body.login && item.password === req.body.password);
    if (user) {
        res.jsonp({ loginStatus: true, userId: user.userId })
    } else {
        res.jsonp({ loginStatus: false })
    }
});

/*server.delete('/photos', (req, res) => {
    let obj = req.query;
    let photosObj = db.usersPhotos.find(item => item.userId == obj.userId);
    photosObj.photos = photosObj.photos.filter(item => item.id != obj.id);
    res.jsonp({result : photosObj.photos})
});*/

/*app.all('/*', function(req, res, next) {//нужны для кросс-браузинга
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});*/

server.use(express.static(__dirname + '/public'));
server.use(fileUpload());

server.get('/', function (req, res) {
    res.render('index.html');
});

server.post('/upload', function(req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let myFile = req.files['myFile'];
    // Use the mv() method to place the file somewhere on your server
    myFile.mv(__dirname + '/public/img/' + myFile.name, function(err) {
        if (err)
            return res.status(500).send(err);
        res.send('File uploaded!');
    });
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
// server.use((req, res, next) => {
//   if (req.method === 'POST') {
//     req.body.createdAt = Date.now()
//   }
//   // Continue to JSON Server router
//   next()
// })

// Use default router
server.use(router);
server.listen(3000, () => {
    console.log('JSON Server is running')
});

/*app.listen(8080, () => {
    console.log('App is running')
});*/