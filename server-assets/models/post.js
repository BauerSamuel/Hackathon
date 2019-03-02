let mongoose = require('mongoose')

let Schema = mongoose.Schema;

let comment = new Schema({
  description: { type: String, required: true },
  commentHot: { type: Number, default: 0 },
  commentCool: { type: Number, default: 0 }
})

let post =
  new Schema({
    date: { type: Date, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }, //must have either a img or a text can have both
    image: { type: String }, //Pretty sure this is how to handle images in our db
    comments: [comment],
    postHot: { type: Number },
    postCool: { type: Number },
  })

//Still need to be sure when a post is deleted, all its comments its related to are also deleted.

module.exports = mongoose.model('Post', post)
