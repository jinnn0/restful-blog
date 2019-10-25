const mongoose = require('mongoose')

let postSchema = new mongoose.Schema({
  title: String, 
  image: String,  
  body: String,
  created: {type: Date, default: Date.now}
}) 
                        //mongoose will pluralize this when creating collection
let Post = mongoose.model('Post', postSchema)
 
module.exports = {postSchema, Post}