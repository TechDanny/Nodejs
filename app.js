const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog")


// express app
const app = express()

// connect to mongodb
const dbURI = "mongodb://localhost:27017/TechDanny-Blog";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))


// register view engines
app.set("view engine", "ejs");

//middleware and static files
app.use(express.static('public'));
app.use(morgan("dev"));



app.get('/', (req, res) => {
    res.redirect("/blogs");
    });

//blog route
app.get('/blogs' , (req, res) => {
    Blog.find().sort({createdAt: -1}) // arranges blog from the newest to the oldest
        .then((result) => {
            res.render("index", {title: "All Blogs", blogs: result});
        })
        .catch((err) => {
            console.log(err);
        })
    });

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});
app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create'});
})

//redirect pages
app.get('/about-us', (req, res) => {
    res.redirect('/about');
})

//404
app.use((req, res) => {
    res.status(404).render('404', {title: 'Page Error'});
})