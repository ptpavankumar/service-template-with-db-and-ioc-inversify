const express = require('express');
const { errorTypes, ValidationError, types } = require('../models');

const TYPES = types;
const addressPost = (req, res) => (
  req.scope.get(TYPES.Address).create(req.body)
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

const addressGet = (req, res) => (
  req.scope.get(TYPES.Address).fetch()
    .then(result => (
      res.status(200).send({ data: result.data })
    ))
    .catch(err => (
      res.status(500).send({ errors: err.message })
    ))
);

const addressGetById = (req, res) => (
  req.scope.get(TYPES.Address).fetchSingle(req.params.addressid)
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

const addressPut = (req, res) => (
  req.scope.get(TYPES.Address).update(req.params.addressid, req.body)
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

const addressDelete = (req, res) => (
  req.scope.get(TYPES.Address).deleteSingle(req.params.addressid, req.body)
    .then(result => (
      res.status(200).send(result.data)
    ))
    .catch(err => (
      res.status(500).send({ errors: err })
    ))
);

const router = express.Router(); // eslint-disable-line new-cap
router.post('/address', addressPost);
router.get('/address', addressGet);
router.get('/address/:addressid', addressGetById);
router.put('/address/:addressid', addressPut);
router.delete('/address/:addressid', addressDelete);

module.exports = router;
