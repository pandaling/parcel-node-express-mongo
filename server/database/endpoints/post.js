import express from 'express';
import Post from '../models/Post';

module.exports = (app) => {
  const router = express.Router();

  router.post('/create', (req, res, next) => {
    const post = new Post(req.body);
    post.save((err, posti) => {
      if (err) return next(err);
      log.info('post insert successfully!');
      res.status(200).send(posti);
    });
  });

  router.get('/query', (req, res, next) => {
    Post.find((err, users) => {
      if (err) next(err);

      res.status(200).send(users);
    });
  });

  router.get('/query/:_id', (req, res, next) => {
    const { _id } = req.params;

    Post
      .findById(_id)
      .select('userId')
      .populate('userId')
      .exec()
      .then((err, results) => {
        if (err) res.send(err);

        res.status(200).send(results);
      });
  });

  app.use('/post', router);
};
