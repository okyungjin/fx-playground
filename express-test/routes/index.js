const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express1',
    html: '<h2>hi~</h2>',
    script: 'test.js'
  });
});

module.exports = router;
