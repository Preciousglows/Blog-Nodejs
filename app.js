const express = require('express');
// const { title } = require('process');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');

const blogRoutes = require('./routes/blogRoutes');


//express app
const app = express();

//connect to mongodb
const dbUri = `mongodb+srv://worukwoprecious:${encodeURIComponent('Precious@2005')}@ninjatutorial.w0bd5xs.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=NinjaTutorial`;
mongoose.connect(dbUri)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');
app.set('views', 'myviews');

//listen for requests
//app.listen(3000);

// app.use((req,res, next) => {
//     console.log('new request made: ');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next();
// })

// app.use((req,res, next) => {
//     console.log('in the next middleware ');
//     next();
// })

//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

//mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });

    blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})


app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get('/single-blog', (req, res) => {
    Blog.findById('662baa61811bfd5bf98294f3')
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    })
})

//routes
app.get('/', (req, res) => {
    // res.send('<p>Home page</p>');
    // res.sendFile('./views/index.html', {root: __dirname});


    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    // ]
    // res.render('index', {title: 'Home', blogs});

    res.redirect('/blogs');
})

app.get('/about', (req, res) => {
    // res.send('<p>About page</p>');
    // res.sendFile('./views/about.html', {root: __dirname});

    res.render('about', {title: 'About'})

});

//blog routes
app.use('/blogs', blogRoutes);

//redirects
// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// });



//404 page
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', {root: __dirname});

    res.status(404).render('404', {title: '404'});
});