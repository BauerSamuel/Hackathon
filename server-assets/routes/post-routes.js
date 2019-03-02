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

//this put request is responsible for both posting and deleting comments
router.put('/:id/comments', (req, res, next) => {
  debugger
  Posts.findById(req.params._id)
    .then(post => {
      //req.body will always be comment
      if (!req.body._id) {
        //create/posting a comment
        post.comments.push(req.body)
      } else {
        //deleting this comment
        for (let i = 0; i < post.comments.length; i++) {
          let c = post.comments[i]
          if (c._id == req.body._id) post.comments.splice(i, 1)
        }
      }
      return post.save()
    })
    .then(() => res.send("Comment change successful."))
=======
  Posts.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(post => res.send(post))
>>>>>>> 0e67405664dd9b7f26226f376ee786d377fd9150
    .catch(err => {
      res.status(400).send(err)
    })

})

module.exports = { router }
