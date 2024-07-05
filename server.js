const http = require('http');
const fs = require('fs');
const _ = require('lodash');
//you can store a server in a variable in cases where you want to use it for multiple requests like web sockets

const server = http.createServer((req, res) => {
    // console.log(req.url, req.method);

    //lodash
    const num = _.random(0, 20);
    console.log(num);

    const greet = _.once(() => {
        console.log('hello');
    })
    greet();
    greet();


    //set header content type
    res.setHeader('Content-Type', 'text/html');
    // res.write('<h1>hello world</h1>');
    // res.write('<p>hello again</p>');

    let path = './views/';
    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-blah':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;

        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }
    //send an html file
    fs.readFile(path, (err, data) => {
        if (err){
            console.log(err);
        }else{
            //res.write(data);
            res.end(data);
        }
    })
    
})

server.listen(3000, '127.0.0.1', () => {
    console.log('listening for requests on port 3000');
});