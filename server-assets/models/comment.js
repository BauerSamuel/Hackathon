let mongoose = require('mongoose')

let Schema = mongoose.Schema

let comment = new Schema({
  description: { type: String, required: true },
  post: { type: Schema.Types.ObjectId, ref: 'comment', virtual: true }
})

//Still need to be sure when a post is deleted, all its comments its related to are also deleted.

module.exports = mongoose.model('Comment', comment)