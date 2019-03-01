let mongoose = require('mongoose')

let Schema = mongoose.Schema;

let post =
  new Schema({

    //must have either a img or a text can have both
    description: { type: String },

    imageURL: { type: String } //Pretty sure this is how to handle images in our db

  })

//Still need to be sure when a post is deleted, all its comments its related to are also deleted.

module.exports = mongoose.model('Post', post)
