const express = require('express');
const { errorTypes, ValidationError, types } = require('../models');

const TYPES = types;
const userPost = (req, res) => (
  req.scope.get(TYPES.User).create(req.body)
  .then(result => (
    res.status(201).send({ data: result.data })
  ))
  .catch((err) => {
    if (err instanceof ValidationError) {
      return res.status(400).send({
        errors: err.message,
      });
    }

    return res.status(500).send({ errors: err.code });
  })
);

const userGet = (req, res) => (
  req.scope.get(TYPES.User).fetch()
  .then(result => (
    res.status(200).send({ data: result.data })
  ))
  .catch(err => (
    res.status(500).send({ errors: err.message })
  ))
);

const userGetById = (req, res) => (
  req.scope.get(TYPES.User).fetchSingle(req.params.userid)
  .then(result => (
    res.status(200).send({ data: result.data })
  ))
  .catch((err) => {
    if (err.message === errorTypes.Unavailable) {
      return res.status(404).send();
    }

    return res.status(500).send({ errors: err.message });
  })
);

const userPut = (req, res) => (
  req.scope.get(TYPES.User).update(req.params.userid, req.body)
  .then(result => (
    res.status(200).send(result.data)
  ))
  .catch((err) => {
    if (err.message === errorTypes.Unavailable) {
      return res.status(404).send();
    }

    return res.status(500).send({ errors: err.message });
  })
  .catch((err) => {
    console.log(err); // eslint-disable-line no-console
    return res.status(500).send({ errors: err });
  })
);

const userDelete = (req, res) => (
  req.scope.get(TYPES.User).deleteSingle(req.params.userid, req.body)
  .then(result => (
    res.status(200).send(result.data)
  ))
  .catch(err => (
    res.status(500).send({ errors: err })
  ))
);

const router = express.Router(); // eslint-disable-line new-cap
router.post('/user', userPost);
router.get('/user', userGet);
router.get('/user/:userid', userGetById);
router.put('/user/:userid', userPut);
router.delete('/user/:userid', userDelete);

module.exports = router;
