const express = require ('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground'); // Adjust the path to match the actual location


mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser:true,
    // useCreateIndex:true, // deprecated
    useUnifiedTopology:true,
    
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.set('view engine', 'ejs')
app.set('views',path.join(__dirname, 'views'))

app.get('/',(req,res)=>{
    res.render('home')
})

app.post('/campgrounds', async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
})

app.get('/campgrounds/:id', async (req, res,) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/show', { campground });
});



app.listen(3000,()=>{
    console.log('Serving on port 3000');
})