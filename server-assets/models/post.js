let mongoose = require('mongoose')

let Schema = mongoose.Schema;

let comment = new Schema({
  commentHot: { type: Number },
  commentCool: { type: Number },
  description: { type: String, required: true },
})

let post =
  new Schema({

    title: { type: String, required: true },
    description: { type: String, required: true }, //must have either a img or a text can have both
    imageURL: { type: String }, //Pretty sure this is how to handle images in our db
    comments: [comment],
    postHot: { type: Number },
    postCool: { type: Number }
  })

//Still need to be sure when a post is deleted, all its comments its related to are also deleted.

module.exports = mongoose.model('Post', post)
