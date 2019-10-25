if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const expressSanitizer = require('express-sanitizer')
const app = express()
   
 
// const {categorySchema, Category}   = require('./models/category')
// const {postSchema, Post} = require('./models/post')
   
        
// App config 
// mongoose.connect('mongodb://localhost/restful-blog', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true  }) 
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(expressSanitizer())
app.set('view engine', 'ejs')  
app.use(express.static('public')) 
  
    
const db = mongoose.connection
mongoose.connect(process.env.database_url, { useNewUrlParser: true})
db.on('error', function(err){ console.log(err) } )
db.once('open', function(){ console.log('connected to mongoose') } )
 

   
// Mongoose/Model config
let blogSchema = new mongoose.Schema({
  category: String,
  title: String,
  image: String,   
  body: String,
  created: {type: Date, default: Date.now}
}) 
   
let Blog = mongoose.model('Blog', blogSchema)




// New models
let postSchema = new mongoose.Schema({
  title: String, 
  image: String,  
  body: String,
  created: {type: Date, default: Date.now}
}) 
                        //mongoose will pluralize this when creating collection
let Post = mongoose.model('Post', postSchema)


 
let categorySchema = new mongoose.Schema({
  name: String,
  posts: [postSchema]
})     
    
let Category = mongoose.model('Category', categorySchema)

  




// Category.create({
//   name: "Testing category-3"
// }) 
  

// Category.findOne({name: "Testing category"}, function(err, category){
//   if(err){
//     console.log(err)
//   } else { 
//     category.posts.push({ 
//       title: "Hello-3",
//       image: "http://www.genericfairuse.com/wp-content/uploads/2016/06/swiftcopyright.jpg",
//       body: " hello-3"
//     }) // origianl category
//     category.save(function(err, category){
//       if(err){ 
//         console.log(err)
//       } else {       //category with added post
//         console.log("yaaay");
//         console.log(typeof(category.name))
//       }
//     }) 
//   }
// })
 


 

// RESTful Routes 
app.get('/', function(req, res){
  res.redirect('/blogs')
}) 

// Index route
app.get('/blogs', function(req, res){ 
  Blog.find({}, function(err, blogs){
    if(err){
      res.render('err')
    } else {
      res.render('index', {blogs : blogs})
    }
  }) 
})  
 
app.get('/blogs/music-publishing', function(req, res){
  Blog.find({}, function(err, blogs){ 
    if(err){
      res.send('err...')
      // res.render('err')
    } else {
      res.render('category-1', {blogs : blogs})
    }
  })
})  
   
// New route
app.get('/blogs/new', function(req, res){
  Category.find({}, function(err, category){
    if(err){
      res.render('err') 
    } else { 
      res.render('new', {category: category})
    }
  })
})

app.post('/blogs/new', function(req, res){
  res.redirect('/blogs/new')
})

app.post('/blogs/addNewCategory', function(req, res){
  let newCategory = req.body.newCategory

  Category.create({
    name: newCategory
  }, function(err, newCategory){
    if(err){
      res.render('new')
    } else {
      res.redirect('/blogs/new')
    }
  })
})
 
// Create route
app.post('/blogs', function(req, res){
  req.body.blog.body = req.sanitize(req.body.blog.body)
  let data = req.body.blog
 
  Blog.create(data, function(err, newBlog){
    if(err){ 
      res.render('new') 
    } else {
      res.redirect('/blogs')
    }
  }) 
}) 


// Show route
app.get('/blogs/:id', function(req, res){
  let id = req.params.id

  Blog.findById(id, function(err, foundBlog){
    if(err) { 
      res.redirect('/blogs')
    } else { 
                         //for ejs  //for main js
      res.render('show', {blog : foundBlog})
    }
  })
})   

// Edit route 
app.get('/blogs/:id/edit', function(req, res){
  let id = req.params.id

  Blog.findById(id, function(err, foundBlog){
    if(err) { 
      res.redirect('/blogs')
    } else { 
      res.render('edit', {blog : foundBlog})
    }
  })
})

// Update route
app.put('/blogs/:id', function(req, res){
  req.body.blog.body = req.sanitize(req.body.blog.body)
  let id = req.params.id
  let newData = req.body.blog

  Blog.findByIdAndUpdate(id, newData, function(err, updatedBlog){
    if(err){
      res.redirect('/blogs')
    } else {
      res.redirect('/blogs/' + id) 
    }  
  })
})
   

app.delete('/blogs/:id', function(req, res){
  let id = req.params.id

  Blog.findByIdAndRemove(id, function(err){
    if(err){
      res.redirect('/blogs')
    } else {
      res.redirect('/blogs')
    }
  })
})
   

app.listen(process.env.PORT || '3000', function(req, res){
  console.log("server has started..");
})