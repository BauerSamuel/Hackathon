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
    .catch(err => res.status(400).send("Not happenin" + err))
})

router.delete('/:id/:nickname', (req, res, next) => {
  Posts.findById(req.params.id)
    .then(post => {
      if (req.params.nickname == post.nickname) {
        Posts.findByIdAndDelete(req.params.id)
          .then(() => res.send('Deleted post.'))
          .catch(err => res.status(400).send(err))
      } else {
        res.status(400).send("Unable to Delete")
      }
    })
    .catch(err => res.status(400).send(err))
})

router.put('/:id', (req, res, next) => {
  Posts.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(p => {
      res.status(200).send(p)
    })
    .catch(err => {
      res.status(500).send(err)
    })
})

//this put request is responsible for both posting and deleting comments
router.put('/:id/comments', (req, res, next) => {
  Posts.findById(req.params.id)
    .then(post => {
      //req.body will always be comment
      if (!req.body._id) {
        //create/posting a comment
        post.comments.push(req.body)
      } else {
        //deleting this comment
        for (let i = 0; i < post.comments.length; i++) {
          let c = post.comments[i]
          if (c._id.toString() == req.body.id) post.comments.splice(i, 1)
        }
      }
      res.send("Comment change successful.")
      return post.save()
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

//responsible for incrementing either hot or cold
router.put('/:id/hot-cool', (req, res, next) => {
  Posts.findById(req.params.id)
    .then(post => {
      let prop = req.body.hot ? 'commentHot' : 'commentCool'
      for (let i = 0; i < post.comments.length; i++) {
        let c = post.comments[i];
        if (c._id.toString() == req.body._id) {
          post.comments[i][prop]++
        }
      }
      return post.save()
    })
    .then(() => res.send({ message: "Post updated!" }))
    .catch(e => res.status(400).send(e))
})

module.exports = { router }
