let mongoose = require('mongoose')

let Schema = mongoose.Schema;

let post =
  new Schema({

    title: { type: String, required: true },
    description: { type: String, required: true }, //must have either a img or a text can have both
    imageURL: { type: String } //Pretty sure this is how to handle images in our db

  })

//Still need to be sure when a post is deleted, all its comments its related to are also deleted.

module.exports = mongoose.model('Post', post)
