const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send('Hey this is the homepage :)');
});

module.exports = router;
