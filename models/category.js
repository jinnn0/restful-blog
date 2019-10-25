const mongoose = require('mongoose')
const {postSchema, Post} = require('./post')
    
 
let categorySchema = new mongoose.Schema({
  title: String,
  posts: [postSchema]
})     
    
let Category = mongoose.model('Category', categorySchema)

module.exports = {categorySchema, Category}        