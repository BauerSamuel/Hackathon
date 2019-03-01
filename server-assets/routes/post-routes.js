let Posts = require('../models/post')

let router = require('express').Router()

router.get('', (req, res, next) => {
  Posts.find({})
    .then(posts => res.send(posts))
    .catch(err => res.status(400).send(err))

})



router.get('/:id', (req, res, next) => {

  Posts.findById(req.params.id)
    .then(post => res.send(post))
    .catch(err => res.status(400).send(err))

})



router.post('', (req, res, next) => {
  Posts.create(req.body)
    .then(post => res.send(post))
    .catch(err => res.status(400).send(err))

})



router.delete('/:id', (req, res, next) => {
  Posts.findByIdAndDelete(req.params.id)
    .then(() => res.send('Deleted post.'))
    .catch(err => res.status(400).send(err))
})

router.put('/:id', (req, res, next) => {
  Posts.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(post => res.send(post))
    .catch(err => {
      res.status(400).send(err)
    })

})

module.exports = { router }
